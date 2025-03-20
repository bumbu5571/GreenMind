const router = require('express').Router();
const { Promotion, Participants, Company, User } = require('../../db/models');
const { verifyAccessToken } = require('../middlewares/verifyTokens');
const upload = require('../middlewares/upload');

router
  .get('/', verifyAccessToken, async (req, res) => {
    try {
      console.log(res.locals.user.id);
      const promotions = await Promotion.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
        include: [
          {
            model: User,
            where: { id: res.locals.user.id },
          },
        ],
      });

      const data = promotions.map((el) => el.get({ plain: true }));

      data.forEach((el) => delete el.Users);
      res.json(data);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })

  .get('/all', async (req, res) => {
    try {
      const promotions = await Promotion.findAll({
        include: [
          {
            model: Company,
            attributes: ['name'],
          },
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });
      const data = promotions.map((el) => el.get({ plain: true }));
      const upData = data.map((el) => {
        return {
          ...el,
          Users: el.Users.map((el) => el.username),
        };
      });
      res.json(upData);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })

  // получение акций определенной компании
  .get('/company', verifyAccessToken, async (req, res) => {
    try {
      const promotions = await Promotion.findAll({
        where: { companyId: res.locals.user.id },
        order: [['date', 'DESC']],
      });
      res.json(promotions);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })

  // получение конкретной акции
  .get('/:id', async (req, res) => {
    try {
      const promotion = await Promotion.findOne({
        where: { id: req.params.id },
        include: [{ model: Company, attributes: ['name'] }],
      });
      res.json(promotion);
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  })

  // создание новой акции
  .post('/', verifyAccessToken, upload.single('img'), async (req, res) => {
    console.log(req.body);
    const { companyId, category, score, name, img, description, date, dateEnd } =
      req.body;

    if (!category || !score || !name || !description || !date || !dateEnd) {
      return res
        .status(400)
        .json({ message: 'Все поля обязательны для заполнения' });
    }

    const filename = req.file ? req.file.filename : null;

    try {
      const newPromotionElement = await Promotion.create({
        companyId: res.locals.user.id,
        category,
        score,
        name,
        img: `images/${filename}`,
        description,
        date,
        dateEnd,
      });
      res.status(201).json(newPromotionElement);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Ошибка при создании акции',
      });
    }
  })

  // удаление конкретной акции
  .delete('/:id', verifyAccessToken, async (req, res) => {
    try {
      const promotion = await Promotion.findByPk(req.params.id);

      if (!promotion) {
        return res.status(404).json({ message: 'Акция не найдена' });
      }

      promotion.destroy();
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Ошибка удаления акции' });
    }
  })

  // редактирование конкретной акции
  .put('/:id', upload.none(), verifyAccessToken, async (req, res) => {
    try {
      const promotion = await Promotion.findByPk(req.params.id);
      const { category, score, name, description, date, dateEnd } = req.body;

      if (!category || !score || !name || !description || !date || !dateEnd) {
        return res
          .status(400)
          .json({ text: 'Все поля обязательны для заполнения' });
      }

      promotion.name = name;
      promotion.category = category;
      promotion.date = date;
      promotion.description = description;
      promotion.score = score;
      promotion.dateEnd = dateEnd;

      // await promotion.save();

      try {
        await Promotion.update(
          {
            name,
            description,
            category,
            date,
            score,
            dateEnd
          },
          { where: { id: req.params.id } }
        );
        res.sendStatus(200);
      } catch (error) {
        console.log(error);
        res.status(500).json({
          message: 'Ошибка при обновлении акции',
        });
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(400);
    }
  });

module.exports = router;
