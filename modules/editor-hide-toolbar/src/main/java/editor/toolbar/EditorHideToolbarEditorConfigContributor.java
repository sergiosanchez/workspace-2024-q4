package editor.toolbar;


import com.liferay.alloy.util.JSONUtil;
import com.liferay.portal.kernel.editor.configuration.BaseEditorConfigContributor;
import com.liferay.portal.kernel.editor.configuration.EditorConfigContributor;
import com.liferay.portal.kernel.json.JSONArray;
import com.liferay.portal.kernel.json.JSONFactoryUtil;
import com.liferay.portal.kernel.json.JSONObject;
import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;
import com.liferay.portal.kernel.portlet.RequestBackedPortletURLFactory;
import com.liferay.portal.kernel.theme.ThemeDisplay;
import com.liferay.portal.kernel.util.Validator;
import com.liferay.portal.kernel.util.GetterUtil;
import com.liferay.portal.kernel.service.RoleLocalServiceUtil;
import com.liferay.portal.kernel.model.Role;


import java.util.List;
import java.util.Map;

import org.osgi.service.component.annotations.Component;

/**
 * @author sergios
 */
@Component(
	immediate = true,
	property = {
      
      "editor.config.key=rich_text",
      "service.ranking:Integer=1000"
    },
    service = EditorConfigContributor.class 
)
public class EditorHideToolbarEditorConfigContributor extends BaseEditorConfigContributor {
	
	@Override
	public void populateConfigJSONObject(
	JSONObject jsonObject, Map<String, Object> inputEditorTaglibAttributes,
	ThemeDisplay themeDisplay,
	RequestBackedPortletURLFactory requestBackedPortletURLFactory) {
		
		if (_log.isWarnEnabled()) {
			_log.warn("json before:" + jsonObject);
		}
		
		JSONArray toolbarSimpleFinal = JSONFactoryUtil.createJSONArray();
			
		try {
			if (jsonObject != null) {
				JSONArray toolbarSimple = jsonObject.getJSONArray("toolbar_simple");
				if (toolbarSimple != null) {
					for(int i=0; i<toolbarSimple.length(); i++) {
						Object toolbarSimpleElement = toolbarSimple.get(i);
						
						if (_log.isWarnEnabled()) {
							_log.warn("toolbar element:" + toolbarSimpleElement);
						}

						List<Role> roles = themeDisplay.getUser().getRoles();

						Role administrator = RoleLocalServiceUtil.fetchRole(themeDisplay.getCompanyId(), "Administrator");

						if (toolbarSimpleElement!= null && 
								toolbarSimpleElement.toString().contains("Table") == false &&
									roles.contains(administrator) == true

						){
							if (_log.isWarnEnabled()) {
								_log.warn("include toolbar:" + toolbarSimpleElement);
								
							}
							toolbarSimpleFinal.put(toolbarSimpleElement);

						}
						
						
					}	
					

					jsonObject.put("toolbar_simple", toolbarSimpleFinal);

			
				}
				
			}
			if (_log.isWarnEnabled()) {
				_log.warn("json after:" + jsonObject);
			}

		}catch (Exception e){
			e.printStackTrace();
		}
		

	}
	
	private static final Log _log = LogFactoryUtil.getLog(
		EditorHideToolbarEditorConfigContributor.class);
}