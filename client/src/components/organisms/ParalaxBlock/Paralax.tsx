import "./Paralax.css";

function Paralax() {
  return (
    <div>
      <section id="innovation-trends" className="hero">
        <div>
          <div className="hero__content">
            <h2 className="title">GreenMind - награждаем за помощь планете</h2>
            <a href="/#about">Узнать больше</a>
          </div>
          <a href="#shape-the-future-end" aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              focusable="false"
              aria-hidden="true"
            >
              <use href="#arrow" />
            </svg>
          </a>
        </div>
      </section>

      <section id="shape-the-future" className="hero">
        <div>
          <div className="hero__content">
            <h2>Помоги планете всего за 3 шага</h2>
          </div>
          <ul>
            <li>
              <section>
                <img src="/images/paralax/tree.svg" alt="" />
                <h3>Представь</h3>
                <p>
                  Каждый день мы загрязнем планету и даже не думаем о
                  последствиях, а что если бы мы разумно относились к
                  потреблению?
                </p>
              </section>
            </li>
            <li>
              <section>
                <span>
                  <img src="/images/paralax/stonetree.svg" alt="" />
                </span>
                <h3>Участвуй</h3>
                <p>
                  Присоединяйся к экологическим акциям. Стань частью сообщества,
                  которое заботится о планете, и получай баллы за свои добрые
                  дела.
                </p>
              </section>
            </li>
            <li>
              <section>
                <span>
                  <img src="/images/paralax/bambook.svg" alt="" />
                </span>
                <h3>Побеждай</h3>
                <p>
                  Обменивай накопленные баллы на ценные вознаграждения. Помогай
                  природе, а взамен получай подарки, скидки и полезные бонусы
                  для себя.
                </p>
              </section>
            </li>
          </ul>
        </div>
      </section>

      <hr id="shape-the-future-end" />
      <main></main>
      <div className="warning">
        <p>
          Your browser does not support scroll-driven animations. <br />
          Please try Chrome, Edge or Opera.
        </p>
      </div>
    </div>
  );
}

export default Paralax;
