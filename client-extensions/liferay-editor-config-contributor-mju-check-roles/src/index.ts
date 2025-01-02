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

const fetchUserRoles = async() => {

	try {
		console.log("Entering async function");

		/* Retrive the roles of the current user */
		const result = await Liferay.Util.fetch('/o/headless-admin-user/v1.0/my-user-account', {method: 'GET'});
		const json = await result.json();
		console.log("json: " + json);
		const {roleBriefs} = json;
		const roleIncluded = roleBriefs.filter(e => e.name.includes('Administrator'));
		console.log("Exiting async function");

		return roleIncluded;
   
	} catch (error) {
		return error.message;
	}
	
}

const editorConfigTransformer: EditorConfigTransformer<any> = (config) => {

	try {
		// CKEditor
		console.log(config);

		const toolbar: [string[]] = config.toolbar_simple;

		console.log(toolbar);

		let transformedConfig: any;

		if (Array.isArray(toolbar)) {

			console.log("Checking roles");

			const roles = fetchUserRoles();

			console.log("Coming from async function");
			
			console.log("roles:", roles);

			if(roles) {

				const hasTableElement = (element) => element.includes('Table');

				const position = toolbar.findIndex(hasTableElement);
				console.log("toolbar position: " + position);
				const rem = toolbar.splice(position, 1);

				console.log("toolbar deleted: " + rem);
			}
				
			

		}

		transformedConfig = {
			...config,
			toolbar,
		};

		const extraPlugins: string = config.extraPlugins;

		return {
			...transformedConfig,
			extraPlugins: extraPlugins ? `${extraPlugins}` : '',
		};
	} catch (error) {
		console.log(error);
	}
	console.log("Finished toolbar changes");

	
	
};

const editorTransformer: EditorTransformer<any> = {
	editorConfigTransformer,
};

export default editorTransformer;