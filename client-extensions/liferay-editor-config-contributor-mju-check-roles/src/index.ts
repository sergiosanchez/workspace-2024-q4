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

const getMyUserAcount = async() => {
	try {
		/* Retrive the roles of the current user */
		const result = await Liferay.Util.fetch(`/o/headless-admin-user/v1.0/my-user-account`, {method: 'GET'});
		return result.json();     
	} catch (error) {
		console.log(error);
	}
}

const checkRoles = async () => {
	try {
	 	const result = await getMyUserAcount();
		const {roleBriefs} = result;
		console.log("Roles:" + roleBriefs);
		/* Check if within the roles, Administrator is included */
		const roleIncluded = roleBriefs.filter(e => e.name.includes('Administrator'));
		console.log("Role Administrator?: " + roleIncluded);
	} catch (error) {
		console.log(error);
	}
}

const editorConfigTransformer: EditorConfigTransformer<any> = (config) => {

	// CKEditor
	console.log(config);

	const toolbar: [string[]] = config.toolbar_liferay;

	console.log(toolbar);

	let transformedConfig: any;

	if (Array.isArray(toolbar)) {
		let hasRoles = checkRoles();

		if (hasRoles) {
			/* Remove the toolbar with table, etc. */
			console.log("toolbar removed");
			const rem = toolbar.splice(4, 1);
		
   			console.log(rem);
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
