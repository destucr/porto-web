"""Builds public/urai/Save-to-Urai.shortcut, the Mac Quick Action that sends the
selected text (or the clipboard) to Urai's saved lines.

Run on a Mac: python3 scripts/build_urai_mac_shortcut.py
It writes the shortcut plist, then signs it with `shortcuts sign` (macOS only
imports signed shortcuts). The key isn't in the file: adding the shortcut
asks for it once ("Paste your Urai key"), and Urai on the iPhone has just
copied it to the clipboard.
"""

import os
import plistlib
import subprocess
import tempfile
import uuid

SAVE_LINE_URL = "https://api.destucikal.site/me/saved-lines"
OUTPUT_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public", "urai", "Save-to-Urai.shortcut")
OBJECT_REPLACEMENT_CHARACTER = "￼"


def text(plain_text):
    return {"Value": {"string": plain_text, "attachmentsByRange": {}}, "WFSerializationType": "WFTextTokenString"}


def text_with_variable(before, variable, after=""):
    """Text with one variable in it, e.g. "Bearer <key>"."""
    return {
        "Value": {
            "string": before + OBJECT_REPLACEMENT_CHARACTER + after,
            "attachmentsByRange": {f"{{{len(before)}, 1}}": variable},
        },
        "WFSerializationType": "WFTextTokenString",
    }


def dictionary(fields):
    return {
        "Value": {
            "WFDictionaryFieldValueItems": [
                {"WFItemType": 0, "WFKey": text(key), "WFValue": value} for key, value in fields
            ]
        },
        "WFSerializationType": "WFDictionaryFieldValue",
    }


def action(identifier, **parameters):
    return {"WFWorkflowActionIdentifier": identifier, "WFWorkflowActionParameters": parameters}


shortcut_input = {"Type": "ExtensionInput"}
key_text_id = str(uuid.uuid4()).upper()
request_id = str(uuid.uuid4()).upper()
saved_check_group = str(uuid.uuid4()).upper()
key_text = {"Type": "ActionOutput", "OutputUUID": key_text_id, "OutputName": "Text"}
request_response = {"Type": "ActionOutput", "OutputUUID": request_id, "OutputName": "Contents of URL"}

actions = [
    # Filled in when the shortcut is added (the import question below).
    action("is.workflow.actions.gettext", UUID=key_text_id, WFTextActionText=""),
    action(
        "is.workflow.actions.downloadurl",
        UUID=request_id,
        WFURL=SAVE_LINE_URL,
        WFHTTPMethod="POST",
        WFHTTPBodyType="JSON",
        ShowHeaders=True,
        WFHTTPHeaders=dictionary([("Authorization", text_with_variable("Bearer ", key_text))]),
        WFJSONValues=dictionary([("text", text_with_variable("", shortcut_input))]),
    ),
    # The API answers a saved line with its fields; anything else is an error.
    action(
        "is.workflow.actions.conditional",
        GroupingIdentifier=saved_check_group,
        WFControlFlowMode=0,
        WFCondition=99,
        WFConditionalActionString="saved_at",
        WFInput={"Type": "Variable", "Variable": {"Value": request_response, "WFSerializationType": "WFTextTokenAttachment"}},
    ),
    action("is.workflow.actions.notification", WFNotificationActionTitle="Urai", WFNotificationActionBody="Saved to your saved lines"),
    action("is.workflow.actions.conditional", GroupingIdentifier=saved_check_group, WFControlFlowMode=1),
    action(
        "is.workflow.actions.notification",
        WFNotificationActionTitle="Urai couldn't save that",
        WFNotificationActionBody="Check your connection. If it keeps failing, set up again in Urai: Settings → Mac.",
    ),
    action("is.workflow.actions.conditional", GroupingIdentifier=saved_check_group, WFControlFlowMode=2, UUID=str(uuid.uuid4()).upper()),
]

shortcut = {
    "WFWorkflowClientVersion": "2607.0.2",
    "WFWorkflowMinimumClientVersion": 900,
    "WFWorkflowMinimumClientVersionString": "900",
    "WFWorkflowIcon": {"WFWorkflowIconStartColor": 4282601983, "WFWorkflowIconGlyphNumber": 61440},
    # A Quick Action in the Services menu, for selected text in any app.
    "WFWorkflowTypes": ["QuickActions"],
    "WFQuickActionSurfaces": ["Services"],
    "WFWorkflowInputContentItemClasses": ["WFStringContentItem"],
    "WFWorkflowHasShortcutInputVariables": True,
    # Run from the menu bar or a keyboard shortcut with nothing selected: use the clipboard.
    "WFWorkflowNoInputBehavior": {"Name": "WFWorkflowNoInputBehaviorGetClipboard", "Parameters": {}},
    "WFWorkflowImportQuestions": [
        {
            "ActionIndex": 0,
            "Category": "Parameter",
            "DefaultValue": "",
            "ParameterKey": "WFTextActionText",
            "Text": "Paste your Urai key. Urai on your iPhone just copied it, so press ⌘V.",
        }
    ],
    "WFWorkflowActions": actions,
}

with tempfile.TemporaryDirectory() as working_directory:
    unsigned_path = os.path.join(working_directory, "Save to Urai.shortcut")
    with open(unsigned_path, "wb") as unsigned_file:
        plistlib.dump(shortcut, unsigned_file, fmt=plistlib.FMT_BINARY)
    subprocess.run(
        ["shortcuts", "sign", "--mode", "anyone", "--input", unsigned_path, "--output", os.path.abspath(OUTPUT_PATH)],
        check=True,
    )
print(f"Signed shortcut: {os.path.relpath(os.path.abspath(OUTPUT_PATH))}")
