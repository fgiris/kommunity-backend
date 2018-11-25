import express from 'express';
import type App from '$/lib/app';

const Sentry = require('@sentry/node');

const routes = (app: App): void => {
  const router: express$Router = express.Router();

  // Get all public details of given userId
  router.get('/:userId', (req: exExpress$Request, res: express$Response) => {
    try {
      app.models.User.findOne({
        where: { uuid: req.params.userId },
      }).then((user) => {
        if (user) {
          res.json({
            user: {
              uuid: user.uuid,
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
              location: user.location,
            },
          });
        } else {
          res.json({ message: 'not_found' });
        }
      });
    } catch (ex) {
      Sentry.captureException(ex);
      res.json({ message: 'error', err: ex });
    }
  });
  app.registerRoute('/api/v1/user', router);
};

module.exports = routes;
