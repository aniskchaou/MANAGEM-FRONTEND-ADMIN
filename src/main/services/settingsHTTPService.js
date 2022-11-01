import http from "../../libraries/axios/axios";
import BASE_URL from "../urls/urls";

const getSystemSettings = () => {
    return http.get(`${BASE_URL}/api/syssettings`)
}

const getDashboardSettings = () => {
    return http.get(`${BASE_URL}/api/dashboardsettings`)
}

const getNotificationSettings = () => {
    return http.get(`${BASE_URL}/api/notificationsettings`)
}

const getEmailSettings = () => {
    return http.get(`${BASE_URL}/api/emailsettings`)
}

const getEmailTemplateettings = () => {
    return http.get(`${BASE_URL}/api/emailtemplatesettings`)
}

const getFooterSettings = () => {
    return http.get(`${BASE_URL}/api/footersettings`)
}

const getHeaderSettings = () => {
    return http.get(`${BASE_URL}/api/headersettings`)
}

const getLocalisationSettings = () => {
    return http.get(`${BASE_URL}/api/localisationsettings`)
}

const editDashboardSettings = (id, data) => {
    return http.put(`${BASE_URL}/api/edit/dashboardsettings/${id}`, data);
};

const editSystemSettings = (id, data) => {
    return http.put(`${BASE_URL}/api/edit/systemsettings/${id}`, data);
};

const editEmailSettings = (id, data) => {
    return http.put(`${BASE_URL}/api/edit/emailsettings/${id}`, data);
};


const editLocalisationSettings = (id, data) => {
    return http.put(`${BASE_URL}/api/edit/localisationsettings/${id}`, data);
};

const editFooterSettings = (id, data) => {
    return http.put(`${BASE_URL}/api/edit/footersettings/${id}`, data);
};

const editHeaderSettings = (id, data) => {
    return http.put(`${BASE_URL}/api/edit/headersettings/${id}`, data);
};

const editNotificationsSettings = (id, data) => {
    return http.put(`${BASE_URL}/api/edit/notificationsettings/${id}`, data);
};

const restoreSystemSettings = (id) => {
    return http.get(`${BASE_URL}/api/restore/syssettings/${id}`);
};

const restoreDashboardettings = (id) => {
    return http.get(`${BASE_URL}/api/restore/dashboard/${id}`);
};

const restoreHeaderettings = (id) => {
    return http.get(`${BASE_URL}/api/restore/header/${id}`);
};

const restoreFooterSettings = (id) => {
    return http.get(`${BASE_URL}/api/restore/footer/${id}`);
};


export default {
    restoreDashboardettings,
    restoreHeaderettings,
    restoreFooterSettings,
    restoreSystemSettings,
    editSystemSettings,
    editEmailSettings,
    editLocalisationSettings,
    editFooterSettings,
    editHeaderSettings,
    editNotificationsSettings,
    getSystemSettings,
    getLocalisationSettings,
    getHeaderSettings,
    getFooterSettings,
    getEmailTemplateettings,
    getEmailSettings,
    getNotificationSettings,
    getDashboardSettings,
    editDashboardSettings
};