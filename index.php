<?php
/**
 * Main Template File
 */
get_header();
?>

<main id="main" class="site-main">
    
    <!-- Hero Section -->
    <section class="hero-section">
        <div class="hero-content">
            <div class="hero-text">
                <h1>Креативный Консалтинг для вашего бизнеса</h1>
                <p>Хотите привлечь инвестиции в готовый бизнес?<br>
                Получить помощь в развитии бизнеса?<br>
                Выиграть в грантовом конкурсе?<br><br>
                Поможем создать бизнес-план с упором на финансы и уникальность</p>
                <a href="#contact" class="btn-primary">
                    Заказать бизнес-план
                </a>
            </div>
            <div class="hero-image">
                <img src="<?php echo get_template_directory_uri(); ?>/images/hero-image.jpg" alt="Impulse Creative Consulting">
            </div>
        </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number">>30</div>
                <div class="stat-label">готовых бизнесов</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">>539</div>
                <div class="stat-label">млн ₽ инвестиций</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">134+</div>
                <div class="stat-label">финансовых моделей</div>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section class="about-section" id="about">
        <div class="container">
            <div class="about-content">
                <div class="about-text">
                    <h2 class="section-title">О нас</h2>
                    <div class="about-description">
                        <p>✍🏻 Бизнес-планы для стартапов на суммы от 1 до 30 млн ₽, технологические проекты в областях AI, SaaS, дронов, ПО, креативных индустрий.</p>
                        <p>✍🏻 Бизнес-планы для промышленных предприятий — от 100 млн до 2,3 млрд ₽.</p>
                        <p>✍🏻 Успешное привлечение инвестиций через ФРП, КРДВ, Мой Бизнес, частные фонды.</p>
                        <p>✍🏻 Практический опыт управления стартап-проектами, взаимодействия с инвесторами и экспертными комиссиями.</p>
                        <p><strong>Доверьте разработку бизнес-плана нам сэкономив время.</strong></p>
                    </div>
                </div>
                <div class="about-image">
                    <img src="<?php echo get_template_directory_uri(); ?>/images/about-image.jpg" alt="О компании">
                </div>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section class="services-section">
        <div class="container">
            <h2 class="section-title">Наши услуги</h2>
            <div class="services-grid">
                <div class="service-card">
                    <h3>Бизнес-планы</h3>
                    <p>Разработка бизнес-планов для стартапов и промышленных предприятий</p>
                </div>
                <div class="service-card">
                    <h3>Финансовое моделирование</h3>
                    <p>Создание финансовых моделей и настройка отчетности</p>
                </div>
                <div class="service-card">
                    <h3>Инвестиционные предложения</h3>
                    <p>Подготовка pitch deck и стратегий переговоров с инвесторами</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Portfolio Section -->
    <section class="portfolio-section" id="portfolio">
        <div class="container">
            <h2 class="section-title">Последние работы</h2>
            <div class="portfolio-grid">
                <?php
                $portfolio_query = new WP_Query(array(
                    'post_type' => 'portfolio',
                    'posts_per_page' => 4,
                ));
                
                if ($portfolio_query->have_posts()) :
                    while ($portfolio_query->have_posts()) : $portfolio_query->the_post();
                ?>
                    <div class="portfolio-item">
                        <?php if (has_post_thumbnail()) : ?>
                            <?php the_post_thumbnail('full'); ?>
                        <?php else : ?>
                            <div style="background: #f0f0f4; width: 100%; height: 100%;"></div>
                        <?php endif; ?>
                    </div>
                <?php
                    endwhile;
                    wp_reset_postdata();
                else :
                ?>
                    <!-- Placeholder items -->
                    <div class="portfolio-item"></div>
                    <div class="portfolio-item"></div>
                    <div class="portfolio-item"></div>
                    <div class="portfolio-item"></div>
                <?php endif; ?>
            </div>
        </div>
    </section>

    <!-- Price List Section -->
    <section class="price-section" id="price">
        <div class="container">
            <h2 class="section-title">ПРАЙС-ЛИСТ:</h2>
            <?php get_template_part('template-parts/price-list'); ?>
        </div>
    </section>

    <!-- Contact Form Section -->
    <section class="contact-section" id="contact">
        <div class="contact-form-wrapper">
            <h2 class="section-title">Запишитесь на консультацию</h2>
            <p style="text-align: center; margin-bottom: 40px; font-family: 'Manrope', sans-serif; font-size: 25px;">
                Расскажу какие у нас есть продукты и как мы можем закрыть задачи вашего бизнеса
            </p>
            <form class="contact-form" method="post" action="<?php echo admin_url('admin-post.php'); ?>">
                <input type="hidden" name="action" value="impulse_contact">
                <?php wp_nonce_field('impulse_contact_form', 'impulse_contact_nonce'); ?>
                
                <div class="form-group">
                    <input type="text" name="contact_name" placeholder="name" required>
                </div>
                
                <div class="form-group">
                    <input type="tel" name="contact_phone" placeholder="phone" required>
                </div>
                
                <div class="form-group">
                    <input type="email" name="contact_email" placeholder="email" required>
                </div>
                
                <div class="form-checkbox">
                    <input type="checkbox" id="privacy" name="privacy" required>
                    <label for="privacy">Нажимая на кнопку, вы даете согласие на обработку персональных данных.</label>
                </div>
                
                <button type="submit" name="impulse_contact_submit" class="submit-btn">Отправить</button>
            </form>
            
            <?php if (isset($_GET['contact']) && $_GET['contact'] == 'success') : ?>
                <div style="margin-top: 20px; padding: 20px; background: #4caf50; color: white; border-radius: 10px; text-align: center;">
                    Спасибо! Ваше сообщение отправлено, мы свяжемся с вами в ближайшее время.
                </div>
            <?php endif; ?>
        </div>
    </section>

</main>

<?php
get_footer();

