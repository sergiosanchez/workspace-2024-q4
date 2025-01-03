/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {
	EditorConfigTransformer,
	EditorTransformer,
} from '@liferay/js-api/editor';
declare var CKEDITOR: any;
declare var Liferay: any;

// Custom plugin for adding the current date
CKEDITOR.plugins.add('insertUser', {
	init: function (editor) {
		if (!editor.getCommand('insertUserCommand')) {
			editor.addCommand('insertUserCommand', {
				exec: function (editor) {
					Liferay.Util.fetch('/o/headless-admin-user/v1.0/my-user-account', {method: 'GET'})
					.then(result => {
							const user = result.json().then(json => {
							console.log("User: " + json.name);
							editor.insertText("hello " + json.name + "!");
						});		
					});
					
					
				},
			});
		}

		if (!editor.ui.get('InsertUser')) {
			// Add the button that triggers the 'insertDateCommand'
			editor.ui.addButton('InsertUser', {
				label: 'Insert Current User',
				command: 'insertUserCommand',
				toolbar: 'basicstyles',
				icon: '/o/frontend-editor-ckeditor-web/ckeditor/plugins/smiley/images/wink_smile.gif',			
			});
		}
	},
});


const editorConfigTransformer: EditorConfigTransformer<any> = (config) => {

	// CKEditor

	const toolbar: string | [string[]] = config.toolbar;

	const buttonName = 'InsertUser';
	let transformedConfig: any;

	if (typeof toolbar === 'string') {
		const activeToolbar = config[`toolbar_${toolbar}`];
		activeToolbar.push([buttonName]);
		console.log("toolbar 1");
		transformedConfig = {
			...config,
			[`toolbar_${toolbar}`]: activeToolbar,
		};
	}
	else if (Array.isArray(toolbar)) {
		console.log("toolbar 2");
		toolbar.push([buttonName]);
		transformedConfig = {
			...config,
			toolbar,
		};
	}

	const extraPlugins: string = config.extraPlugins;

	return {
		...transformedConfig,
		extraPlugins: extraPlugins ? `${extraPlugins},insertUser` : 'insertUser',
	};
};

const editorTransformer: EditorTransformer<any> = {
	editorConfigTransformer,
};

export default editorTransformer;
