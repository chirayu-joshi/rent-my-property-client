const configs = {
  port: 3333,
  mapQuestApiUrl: 'http://www.mapquestapi.com',
  ipstackUrl: 'http://api.ipstack.com',
  email_regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password_regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
  name_regex: /^[a-zA-Z]+$/
}

export default configs;
