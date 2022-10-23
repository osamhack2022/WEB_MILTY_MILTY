const Request = require('../models/request.model');
const Users = require('../models/users.model');

exports.user_get_report = async (req, res) => {
  const { usr_pid } = req.body;
  try {
    const requests = await Request.findAll({ where: { request_usr: usr_pid } });

    const data = await Promise.all(
      requests.map(
        ({ request_pid, request_reason, request_date, request_status }) => ({
          pid: request_pid,
          description: request_reason,
          time: request_date,
          status: request_status,
        }),
      ),
    );

    res.status(200).json({
      result: 'success',
      request: data,
    });
  } catch {
    res.status(200).json({
      result: 'fail',
    });
  }
};

exports.admin_get_report = async (req, res) => {
  const { division_code } = req.body;
  try {
    const requests = await Request.findAll({
      where: { request_division_code: division_code },
    });

    const data = await Promise.all(
      requests.map(
        async ({
          request_pid,
          request_reason,
          request_date,
          request_usr,
          request_status,
        }) => {
          const { usr_name, usr_class } = await Users.findOne({
            where: { usr_pid: request_usr },
          });

          return {
            pid: request_pid,
            description: request_reason,
            time: request_date,
            user_name: `${usr_class} ${usr_name}`,
            status: request_status,
          };
        },
      ),
    );

    res.status(200).json({
      result: 'success',
      request: data,
    });
  } catch {
    res.status(200).json({
      result: 'fail',
    });
  }
};
