package editor.accesibilidad;


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

import java.util.List;
import java.util.Map;

import org.osgi.service.component.annotations.Component;

/**
 * @author sergios
 */
@Component(
	immediate = true,
	property = {
      "editor.name=ckeditor",
      "javax.portlet.name=com_liferay_journal_web_portlet_JournalPortlet",
      "service.ranking:Integer=1000"
    },
    service = EditorConfigContributor.class 
)
public class EditorAccesibilidadEditorConfigContributor extends BaseEditorConfigContributor {
	
	@Override
	public void populateConfigJSONObject(
	JSONObject jsonObject, Map<String, Object> inputEditorTaglibAttributes,
	ThemeDisplay themeDisplay,
	RequestBackedPortletURLFactory requestBackedPortletURLFactory) {
		
		if (_log.isDebugEnabled()) {
			_log.debug("json before:" + jsonObject);
		}
			
		String extraPlugins = jsonObject.getString("extraPlugins");

		if (Validator.isNotNull(extraPlugins)) {
			extraPlugins = extraPlugins + ",balloonpanel,a11ychecker";
		}
		else {
			extraPlugins = ",balloonpanel,a11ychecker";
		}

		jsonObject.put("extraPlugins", extraPlugins);
		
		JSONArray toolbarLiferayFinal = JSONFactoryUtil.createJSONArray();
		toolbarLiferayFinal.put(toJSONArray("['A11ychecker']"));	
		
		JSONArray toolbarLiferay = jsonObject.getJSONArray("toolbar_liferay");
		for(int i=0; i<toolbarLiferay.length(); i++) {
			toolbarLiferayFinal.put(toolbarLiferay.get(i));
		}	
		
		jsonObject.put("toolbar_liferay", toolbarLiferayFinal);
		
		if (_log.isDebugEnabled()) {
			_log.debug("json after:" + jsonObject);
		}
		

	}
	
	private static final Log _log = LogFactoryUtil.getLog(
		EditorAccesibilidadEditorConfigContributor.class);
}