const router = require("express").Router();
const { Promotion, Participant, User } = require("../../db/models");
const { verifyAccessToken } = require("../middlewares/verifyTokens");
const companyOnly = require("../middlewares/companyOnly");

// получение всех акций определенного пользователя (не компании)
router
  .get("/", verifyAccessToken, async (req, res) => {
    const userId = res.locals.user.id;

    try {
      const promotions = await Promotion.findAll({
        include: [
          {
            model: User,
            // as: "participants",
            required: true,
            where: { id: userId },
          },
        ],
      });
      res.json(promotions);
    } catch (error) {
      console.error("Ошибка получения акций пользователя:", error);
      res.status(500).json({ error: "Произошла ошибка на сервере" });
    }
  })

  // кнопка отмены участия
  .delete("/:id", verifyAccessToken, async (req, res) => {
    const { id } = req.params;
    // console.log("id при УДаЛЕНИИ", id);

    try {
      const participant = await Participant.findOne({
        where: {
          userId: res.locals.user.id,
          promotionId: id,
        },
      });

      // console.log("participant при УДАЛЕНИИ", participant.userId);
      // console.log("res.locals.user.id DELETE", res.locals.user.id);

      if (participant.userId === res.locals.user.id) {
        participant.destroy();
        res.sendStatus(200);
      } else {
        res.status(307).json({ message: "У вас нет прав на удаление записи" });
      }
    } catch (error) {
      console.log("ошибка тут");
      console.error(error);
      res.sendStatus(400);
    }
  })

  // кнопка "участвовать" в мероприятии
  .post("/:id", verifyAccessToken, async (req, res) => {
    const { id } = req.params;
    // console.log("id при ДОБАВЛЕНИИ", id);

    try {
      const [participant, created] = await Participant.findOrCreate({
        where: {
          userId: res.locals.user.id,
          promotionId: id,
        },
        defaults: {
          isParticipated: false,
        },
      });


      // console.log("participant.userId при ДОБАВЛЕНИИ", participant.userId);
      // console.log("res.locals.user.id POST", res.locals.user.id);
      // console.log('participant при добавлении', participant);

      if (created) {
        res.status(200).json(participant);
      } else {
        res.status(399).json({ message: "Запись была добавлена ранее" });
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })

  // получение участников определенной акции
  .get("/promo/:id", verifyAccessToken, async (req, res) => {
    const userId = res.locals.user.id;

    try {
      const participants = await Promotion.findOne({
        where: { id: req.params.id, companyId: userId },
        include: [
          {
            model: User,
            attributes: ["id", "username", "email"],
            through: {
              attributes: ["id", "isParticipated", "promotionId", "userId"],
            },
          },
        ],
      });
      res.json(participants);
    } catch (error) {
      console.error("Ошибка получения participants", error);
      res.status(500).json({ message: "Произошла ошибка на сервере" });
    }
  })

  // удаления участника определенной акции
  .delete("/:id/:userId", verifyAccessToken, companyOnly, async (req, res) => {
    // const currentUserId = res.locals.user.id;

    try {
      const participant = await Participant.findOne({
        where: {
          userId: req.params.userId,
          promotionId: req.params.id,
        },
      });

      if (participant) {
        // res.json(participant);
        participant.destroy();
        res.sendStatus(200);
      } else {
        res.status(400).json({ message: "Такой участник не найден" });
      }

      // res.json(participant);
    } catch (error) {
      console.error("Ошибка получения participants", error);
      res.status(500).json({ message: "Произошла ошибка на сервере" });
    }
  })

  // toggle: выполнил или нет юзер акцию + пересчет баллов у пользователя и апдейт в User.score
  .patch("/:id", verifyAccessToken, companyOnly, async (req, res) => {
    try {
      // @ TODO: нужно проверить, что пользователь принадлежит акции, которая принадлежит компании
      const participant = await Participant.findOne({
        where: { id: req.params.id },
      });
      const { isParticipated } = req.body;

      const updatingParticipant = await participant.update({ isParticipated });

      if (updatingParticipant) {
        const user = await User.findOne({
          where: { id: updatingParticipant.userId },
          include: [
            {
              model: Promotion,
              through: {
                attributes: ["isParticipated"],
              },
            },
          ],
        });

        if (user) {
          const commonScore = user.Promotions.reduce((acc, promo) => {
            if (promo.Participant.isParticipated) {
              return acc + promo.score;
            } else {
              return acc;
            }
          }, 0);
          await user.update({ score: commonScore });
        }
      }

      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  });

module.exports = router;
