/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {
	EditorConfigTransformer,
	EditorTransformer,
} from '@liferay/js-api/editor';

const editorConfigTransformer: EditorConfigTransformer<any> = (config) => {

	// Alloy Editor

	const toolbars: any = config.toolbars;

	if (typeof toolbars === 'object') {
		interface ISelection {
			buttons: Array<string>;
			name: string;
		}

		const textSelection: ISelection = toolbars.styles?.selections?.find(
			(selection: ISelection) => selection.name === 'text'
		);

		if (textSelection.buttons) {
			textSelection.buttons.push('video');

			return {
				...config,
				toolbars,
			};
		}
	}

	// CKEditor

	const toolbar: string | [string[]] = config.toolbar;

	const buttonName = 'AICreator';
	let transformedConfig: any;

	if (typeof toolbar === 'string') {
		const activeToolbar = config[`toolbar_${toolbar}`];

		activeToolbar.push([buttonName]);

		transformedConfig = {
			...config,
			[`toolbar_${toolbar}`]: activeToolbar,
		};
	}
	else if (Array.isArray(toolbar)) {
		toolbar.push([buttonName]);

		transformedConfig = {
			...config,
			toolbar,
		};
	}

	const extraPlugins: string = config.extraPlugins;

	return {
		...transformedConfig,
		extraPlugins: extraPlugins ? `${extraPlugins},aicreator` : 'aicreator',
	};
};

const editorTransformer: EditorTransformer<any> = {
	editorConfigTransformer,
};

export default editorTransformer;
