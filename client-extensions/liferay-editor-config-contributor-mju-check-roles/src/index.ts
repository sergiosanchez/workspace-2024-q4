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


const editorConfigTransformer: EditorConfigTransformer<any> = (config) => {

	// CKEditor
	console.log(config);

	const toolbar: [string[]] = config.toolbar_liferay;

	console.log(toolbar);

	let transformedConfig: any;

	if (Array.isArray(toolbar)) {
		
		try {
			/* Retrieve the roles of the current user */
			const result = Liferay.Util.fetch(`/o/headless-admin-user/v1.0/my-user-account`, {method: 'GET'});
			console.log("Result:" + result);
			const liferayUser = result.json();

			const {roleBriefs} = liferayUser;
			console.log("Roles:" + roleBriefs);
			/* Check if within the roles, Administrator is included */
			const roleIncluded = roleBriefs.filter(e => e.name.includes('Administrator'));
			console.log("Role Administrator?: " + roleIncluded);

			if (roleIncluded) {
				/* Remove the toolbar with table, etc. */
				console.log("toolbar removed");
				const rem = toolbar.splice(4, 1);
			
	   			console.log(rem);
	   		}

		} catch (error) {
			console.log(error);
		}
	
		
		transformedConfig = {
			...config,
			toolbar,
		};
	}

	const extraPlugins: string = config.extraPlugins;

	return {
		...transformedConfig,
		extraPlugins: extraPlugins ? `${extraPlugins}` : '',
	};
};

const editorTransformer: EditorTransformer<any> = {
	editorConfigTransformer,
};

export default editorTransformer;
