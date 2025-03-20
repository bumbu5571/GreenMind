"use strict";
const SEVEN_DAYS = 1000 * 60 * 60 * 24 * 7;
const ONE_DAY = 1000 * 60 * 60 * 24;

module.exports = {
  async up(queryInterface, Sequelize) {
    Example: await queryInterface.bulkInsert(
      'Promotions',
      [
        {
          companyId: 1,
          category: 'Сортировка',
          score: 1000,
          name: 'IPhone за 10 бутылок',
          img: 'images/sorting1.jpg',
          description: `Сдай 10 пластиковых бутылок в специальные пункты приема и получи шанс выиграть новый iPhone! 
            Мы хотим привлечь внимание к проблеме утилизации пластика и показать, как переработка может стать полезной не только для окружающей среды, 
            но и для каждого из нас. Акция действует в течение месяца, а победители будут объявлены на специальной трансляции. 
            Присоединяйся к инициативе и делай мир чище!`,
          date: new Date(Date.now() + ONE_DAY * Math.round(Math.random() * 6 ) ),
          dateEnd: new Date(Date.now() + SEVEN_DAYS),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          companyId: 1,
          category: 'Утилизация',
          score: 500,
          name: 'Скидка на MacBook',
          img: 'images/sorting4.jpg',
          description: `Принеси свою старую технику Apple (например, iPhone, iPad или MacBook) в наш пункт утилизации и получи скидку на новую модель! 
            Наша программа переработки направлена на сокращение электронных отходов и повторное использование редких материалов. 
            Все устройства, переданные на утилизацию, будут разбираться и перерабатываться безопасным для природы способом. 
            Таким образом, вы не только обновляете свою технику, но и делаете вклад в будущее нашей планеты.`,
          date: new Date(Date.now() + ONE_DAY * Math.round(Math.random() * 6 ) ),
          dateEnd: new Date(Date.now() + SEVEN_DAYS),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          companyId: 1,
          category: 'Волонтерство',
          score: 300,
          name: 'Футболка от Apple',
          img: 'images/volunteer-teamwork.jpg',
          description: `Стань волонтером и присоединись к нашей акции по уборке городских парков. Все участники получают фирменную футболку от Apple 
            в благодарность за вклад в улучшение экологии. Уборка проходит каждую субботу в крупных городах страны. Мы обеспечиваем участников 
            всем необходимым инвентарем и обеспечиваем безопасность на мероприятии. Присоединяйся, помогай очищать природу от мусора и получай приятные бонусы!`,
          date: new Date(Date.now() + ONE_DAY * Math.round(Math.random() * 6 ) ),
          dateEnd: new Date(Date.now() + SEVEN_DAYS),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          companyId: 1,
          category: 'Посадка деревьев',
          score: 200,
          name: 'Посади дерево - получи баллы',
          img: 'images/tree-planting.jpg',
          description: `Прими участие в глобальной инициативе по посадке деревьев! Мы организуем массовые акции по восстановлению лесов, 
            и каждый участник получает баллы, которые можно обменять на другие акции или скидки. Это прекрасная возможность внести свой вклад в борьбу с изменением климата, 
            восстановить экосистему и оставить зеленое наследие для будущих поколений. Узнай, где проходит ближайшая акция, и присоединяйся!`,
          date: new Date(Date.now() + ONE_DAY * Math.round(Math.random() * 6 ) ),
          dateEnd: new Date(Date.now() + SEVEN_DAYS),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          companyId: 2,
          category: 'Сортировка',
          score: 500,
          name: 'Разделяй и властвуй: сортировка отходов',
          img: 'images/sorting3.png',
          description:
            'Сортируйте мусор дома правильно и получите баллы!  За каждый собранный килограмм отсортированных отходов (бумага, пластик, стекло) вы получаете 50 баллов. Накопленные баллы можно обменять на скидки у наших партнеров.',
          date: new Date(Date.now() + ONE_DAY * Math.round(Math.random() * 6 ) ),
          dateEnd: new Date(Date.now() + SEVEN_DAYS),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          companyId: 2,
          category: 'Волонтерство',
          score: 500,
          name: 'Уборка парка',
          img: 'images/volunteer-teamwork3.jpeg',
          description:
            'Присоединяйтесь к нашей команде волонтеров и помогите очистить городской парк от мусора!  За каждый час работы вы получаете 50 баллов, которые можно обменять на сувениры с символикой нашего проекта.',
          date: new Date(Date.now() + ONE_DAY * Math.round(Math.random() * 6 ) ),
          dateEnd: new Date(Date.now() + SEVEN_DAYS),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          companyId: 2,
          category: 'Посадка деревьев',
          score: 500,
          name: 'Весенняя посадка в городском парке',
          img: 'images/tree-planting2.jpg',
          description:
            'Присоединяйтесь к нашей весенней акции по посадке деревьев в городском парке! За каждое посаженное дерево вы получите 50 баллов, которые можно обменять на фирменную футболку.',
          date: new Date(Date.now() + ONE_DAY * Math.round(Math.random() * 6 ) ),
          dateEnd: new Date(Date.now() + SEVEN_DAYS),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          companyId: 3,
          category: 'Волонтерство',
          score: 750,
          name: 'Посадка деревьев',
          img: 'images/volunteer-teamwork4.jpeg',
          description:
            'Помогите нам посадить деревья в городском лесу!  За каждый посаженное дерево вы получите 75 баллов, которые можно обменять на бесплатный обед в нашем эко-кафе.',
          date: new Date(Date.now() + ONE_DAY * Math.round(Math.random() * 6 ) ),
          dateEnd: new Date(Date.now() + SEVEN_DAYS),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          companyId: 3,
          category: 'Потребление',
          score: 750,
          name: 'Чистый Новый год',
          img: 'images/cleanny.jpeg',
          description:
            'Акция "Чистый Новый год" призвана сделать празднование более экологичным и уменьшить негативное воздействие на окружающую среду. Ее суть заключается в том, чтобы отказаться от пластиковых пакетов в пользу многоразовых шоперов. Участники акции смогут узнать больше о преимуществах экологичных материалов, принять участие в розыгрыше стильных шоперов и внести свой вклад в сохранение природы. Присоединяйтесь, чтобы встретить Новый год осознанно и с заботой о планете!',
          date: new Date(Date.now() + ONE_DAY * Math.round(Math.random() * 6 ) ),
          dateEnd: new Date(Date.now() + SEVEN_DAYS),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          companyId: 4,
          category: 'Сортировка',
          score: 2000,
          name: 'Зеленый офис:  сортируем вместе!',
          img: 'images/sorting2.jpg',
          description:
            'В вашем офисе внедряется программа по сортировке мусора! За каждый собранный килограмм правильно отсортированных отходов ваш офис получает баллы.  Накопленные баллы могут быть обменены на новые офисные принадлежности или благотворительный взнос.',
          date: new Date(Date.now() + ONE_DAY * Math.round(Math.random() * 6 ) ),
          dateEnd: new Date(Date.now() + SEVEN_DAYS),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          companyId: 4,
          category: 'Волонтерство',
          score: 1000,
          name: 'Эко-просвещение в школах',
          img: 'images/volunteer-teamwork5.jpg',
          description:
            'Проведите урок об экологии для школьников! За каждый час проведенного урока вы получите 100 баллов, которые могут быть обменены на экологические материалы.',
          date: new Date(Date.now() + ONE_DAY * Math.round(Math.random() * 6 ) ),
          dateEnd: new Date(Date.now() + SEVEN_DAYS),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          companyId: 4,
          category: 'Посадка деревьев',
          score: 1000,
          name: 'Создание аллеи памяти',
          img: 'images/tree-planting4.jpg',
          description:
            'Примите участие в создании аллеи памяти, посадив дерево в честь близкого человека. За каждое посаженное дерево вы получите 100 баллов и именной сертификат.',
          date: new Date(Date.now() + ONE_DAY * Math.round(Math.random() * 6 ) ),
          dateEnd: new Date(Date.now() + SEVEN_DAYS),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          companyId: 5,
          category: 'Сортировка',
          score: 100,
          name: 'Сдай батарейки, получи скидку!',
          img: 'images/utilization.jpg',
          description:
            'Сдайте использованные батарейки в специальные контейнеры и получите скидку 10% на следующую покупку в нашем магазине!  Принимаем все типы батареек.',
          date: new Date(Date.now() + ONE_DAY * Math.round(Math.random() * 6 ) ),
          dateEnd: new Date(Date.now() + SEVEN_DAYS),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          companyId: 5,
          category: 'Утилизация',
          score: 1500,
          name: 'Программа по переработке электроники',
          img: 'images/utilization2.jpg',
          description:
            'Сдайте вашу старую электронику (телефоны, компьютеры, телевизоры) и получите вознаграждение! Мы безопасно утилизируем электронные отходы и бережно относимся к окружающей среде.',
          date: new Date(Date.now() + ONE_DAY * Math.round(Math.random() * 6 ) ),
          dateEnd: new Date(Date.now() + SEVEN_DAYS),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          companyId: 5,
          category: 'Волонтерство',
          score: 1200,
          name: 'Участие в экологическом фестивале',
          img: 'images/volunteer-teamwork2.jpg',
          description:
            'Помогите нам организовать и провести экологический фестиваль! За каждый день работы на фестивале вы получите 120 баллов и возможность выиграть специальные призы.',
          date: new Date(Date.now() + ONE_DAY * Math.round(Math.random() * 6 ) ),
          dateEnd: new Date(Date.now() + SEVEN_DAYS),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    Example: await queryInterface.bulkDelete("Promotions", null, {});
  },
};
