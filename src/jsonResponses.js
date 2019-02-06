const respond = (request, response, content, types, status) => {
  let responseString = '';
  let type = '';

  if (types[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${content.message}</message>`;
    responseXML = (status === 200 ? responseXML : `${responseXML}<id>${content.message}</id>`);
    responseXML = `${responseXML} </response>`;
    responseString = responseXML;
    type = 'text/xml';
  } else {
    responseString = JSON.stringify(content);
    type = 'application/json';
  }

  response.writeHead(status, { 'Content-Type': type });
  response.write(responseString);
  response.end();
};

const getSuccess = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'This is a successful response',
  };
  return respond(request, response, responseJSON, acceptedTypes, 200);
};

  // TODO

const getBad = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'This is a successful response',
  };
  // check if has valid param
  if (params.valid === 'true') { return respond(request, response, responseJSON, acceptedTypes, 200); }

  responseJSON.message = 'Missing valid query parameter set to true';
  responseJSON.id = 'badRequest';
  return respond(request, response, responseJSON, acceptedTypes, 400);
};


const getUnauth = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'This is a successful response',
  };
  // check if has loggedIn param
  if (params.loggedIn === 'yes') { return respond(request, response, responseJSON, acceptedTypes, 200); }


  responseJSON.message = 'Missing loggedIn query parameter set to yes';
  responseJSON.id = 'unauthorized';
  return respond(request, response, responseJSON, acceptedTypes, 401);
};


const getForbidden = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };
  return respond(request, response, responseJSON, acceptedTypes, 403);
};


const getInternal = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internalError',
  };
  return respond(request, response, responseJSON, acceptedTypes, 500);
};


const getNotImplemented = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };
  return respond(request, response, responseJSON, acceptedTypes, 501);
};


const getNotFound = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
  };
  return respond(request, response, responseJSON, acceptedTypes, 404);
};

module.exports = {
  getSuccess,
  getBad,
  getUnauth,
  getForbidden,
  getInternal,
  getNotImplemented,
  getNotFound,
};
