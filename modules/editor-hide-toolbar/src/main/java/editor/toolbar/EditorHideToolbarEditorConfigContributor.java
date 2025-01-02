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
			//TODO Quitar esto
			String namespace = GetterUtil.getString(
			inputEditorTaglibAttributes.get(
				"liferay-ui:input-editor:namespace"));
			String name = GetterUtil.getString(
				inputEditorTaglibAttributes.get("liferay-ui:input-editor:name"));
			String editorName = GetterUtil.getString(
				inputEditorTaglibAttributes.get(
				"liferay-ui:input-editor:editorName"));
			String editorKey = GetterUtil.getString(
				inputEditorTaglibAttributes.get(
				"liferay-ui:input-editor:editorKey"));
			_log.warn("namespace:" + namespace);
			_log.warn("name:" + name);
			_log.warn("editorKey:" + editorKey);
		}
		
		JSONArray toolbarLiferayFinal = JSONFactoryUtil.createJSONArray();
			
		
		if (jsonObject != null) {
			JSONArray toolbarLiferay = jsonObject.getJSONArray("toolbar_liferay");
			if (toolbarLiferay != null) {
				for(int i=0; i<toolbarLiferay.length(); i++) {
					//TODO Arreglar esto
					if (i!=4) {
						if (_log.isWarnEnabled()) {
							_log.warn("include toolbar:" + toolbarLiferay.get(i));
							
						}
						toolbarLiferayFinal.put(toolbarLiferay.get(i));
					} 
				}	
				
				//jsonObject.put("toolbar_liferay", toolbarLiferayFinal);
				//jsonObject.put("toolbar_editInPlace", toolbarLiferayFinal);
				//jsonObject.put("toolbar_email", toolbarLiferayFinal);
				
				//jsonObject.put("toolbar_liferayArticle", toolbarLiferayFinal);
				//jsonObject.put("toolbar_phone", toolbarLiferayFinal);
				jsonObject.put("toolbar_simple", toolbarLiferayFinal);
				//jsonObject.put("toolbar_tablet", toolbarLiferayFinal);
				//jsonObject.put("toolbar_text_advanced", toolbarLiferayFinal);
				//jsonObject.put("toolbar_text_simple",toolbarLiferayFinal);
		
			}
			
		}
		if (_log.isWarnEnabled()) {
			_log.warn("json after:" + jsonObject);
		}
		

	}
	
	private static final Log _log = LogFactoryUtil.getLog(
		EditorHideToolbarEditorConfigContributor.class);
}