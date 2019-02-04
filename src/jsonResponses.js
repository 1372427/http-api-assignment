const respond = (request, response, content, types, status) => {
    let responseString = '';
    let type = '';

    if(acceptedTypes[0] === 'text/xml'){
        let responseXML = '<response>';
        responseXML = `${responseXML} <message>${content.message}</message>`;
        statys === 200? '' : responseXML = `${responseXML}<id>${content.message}</id>`;
        responseXML = `${responseXML} </response>`;
        responseString = responseXML;
        type = 'text/xml';
      }
    else{
        responseString = JSON.stringify(content);
        type = 'application/json';
    }

    response.writeHead(status, { 'Content-Type': type });
    response.write(responseString);
    response.end();
  };
  
  const getSuccess = (request, response, acceptedTypes) => {
    let responseJSON = {
        message: "This is a successful response"
    }
    return respond(request, response, responseJSON, acceptedTypes, 200);
  };

  //TODO
    
  const getBad = (request, response, acceptedTypes) => {
    let responseJSON = {
        message: "success"
    }
    //check if has valid param
    return respond(request, response, responseJSON, acceptedTypes, 200);
  };

    
  const getUnauth = (request, response, acceptedTypes) => {
    let responseJSON = {
        message: "success"
    }
    //check if has loggedIn param
    return respond(request, response, responseJSON, acceptedTypes, 200);
  };

    
  const getForbidden = (request, response, acceptedTypes) => {
    let responseJSON = {
        message: "forbidden"
    }
    return respond(request, response, responseJSON, acceptedTypes, 403);
  };

    
  const getInternal = (request, response, acceptedTypes) => {
    let responseJSON = {
        message: "Internal Server Error. Something went wrong.",
        id: "internalError"
    }
    return respond(request, response, responseJSON, acceptedTypes, 500);
  };
  
    
  const getNotImplemented = (request, response, acceptedTypes) => {
    let responseJSON = {
        message: "A get request for this page has not been implemented yet. Check again later for updated content.",
        id: "notImplemented"
    }
    return respond(request, response, responseJSON, acceptedTypes, 501);
  };

    
  const getNotFound = (request, response, acceptedTypes) => {
    let responseJSON = {
        message: "The page you are looking for was not found",
        id: "notFound"
    }
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