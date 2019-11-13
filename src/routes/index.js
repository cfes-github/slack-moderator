"use strict";var _express = _interopRequireDefault(require("express"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
const router = _express.default.Router();

function post(name, handler) {
  router.post(name, async (request, response, next) => {
    try {
      await handler(request, response);
    } catch (error) {
      next(error);
    }
  });
}

post('/slack/hook', async function (request, response) {
  const body = request.body;
  if (body.token != request.config.slack.verificationToken) {
    response.status(401).send();
    return;
  }

  if (body.type == "url_verification" && body.challenge) {
    response.status(200).send(request.body.challenge);
    return;
  }

  await request.rules.processMessage(request, body);

  response.status(200).send({});
});


module.exports = router;
