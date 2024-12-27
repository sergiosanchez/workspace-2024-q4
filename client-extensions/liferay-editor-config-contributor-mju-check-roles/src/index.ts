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

const checkRoles = async() => {

	try {

		/* Retrive the roles of the current user */
		const result = await Liferay.Util.fetch(`/o/headless-admin-user/v1.0/my-user-account`, {method: 'GET'});
		
		const {roleBriefs} = await result.json();
		console.log("Roles:" + roleBriefs);

		/* Check if within the roles, Administrator is included */
		const roleIncluded = roleBriefs.filter(e => e.name.includes('Administrator'));
		console.log("Role Administrator?: " + roleIncluded);
		return roleIncluded;    
	} catch (error) {
		console.log(error);
	}
}

const editorConfigTransformer: EditorConfigTransformer<any> = async(config) => {

	try {
		// CKEditor
		console.log(config);

		const toolbar: [string[]] = config.toolbar_liferay;

		console.log(toolbar);

		let transformedConfig: any;

		if (Array.isArray(toolbar)) {

			console.log("Checking roles");

			const roles = await checkRoles();
		    
		    if (roles) {
	            console.log("roles:", roles);

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
