import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, Route, Routes } from 'react-router-dom'

type ProgramItem = {
  day: string
  time: string
  title: string
  description: string
  image: string
}

type Sermon = {
  title: string
  date: string
  speaker: string
  theme: string
  summary: string
  videoSrc: string
  poster: string
}

type GalleryItem = {
  title: string
  category: 'Communauté' | 'Cultes' | 'Louanges' | 'Évangélisation' | 'Jeunesse' | 'Œuvres sociales' | 'Événements spéciaux'
  date: string
  image: string
  videoSrc?: string
}

type Testimonial = {
  name: string
  role: string
  quote: string
}

const navItems = [
  { label: 'Accueil', path: '/' },
  { label: 'À propos', path: '/about' },
  { label: 'Cultes', path: '/worship' },
  { label: 'Prédications', path: '/sermons' },
  { label: 'Œuvres sociales', path: '/social' },
  { label: 'Faire un don', path: '/donate' },
  { label: 'Témoignages', path: '/testimonials' },
  { label: 'Galerie', path: '/gallery' },
  { label: 'Contact', path: '/contact' },
]

const regularPrograms: ProgramItem[] = [
  {
    day: 'Chaque dimanche',
    time: '09:00 - 11:30',
    title: 'Culte dominical',
    description: 'Louange, prière et enseignement biblique au sein de la communauté.',
    image: '/media/thumbnails/frame-01.jpg',
  },
  {
    day: 'Chaque mercredi',
    time: '18:00 - 19:30',
    title: 'Réunion de prière',
    description: 'Un temps de recueillement, d’intercession et d’encouragement fraternel.',
    image: '/media/thumbnails/frame-02.jpg',
  },
  {
    day: 'Chaque vendredi',
    time: '17:30 - 19:00',
    title: 'Étude biblique et jeunesse',
    description: 'Un rendez-vous pour découvrir les Écritures et grandir ensemble dans la foi.',
    image: '/media/thumbnails/frame-04.jpg',
  },
]

const churchPhoto = '/media/Image_1787233723690.jpg'
const heroPhoto = '/media/thumbnails/frame-01.jpg'
const socialPhoto = '/media/thumbnails/frame-03.jpg'
const videoFiles = [
  'VID-20260803-WA0018.mp4',
  'VID-20260809-WA0017.mp4',
  'VID-20260820-WA0011.mp4',
  'VID-20260820-WA0013.mp4',
  'VID-20260820-WA0017.mp4',
  'VID-20260820-WA0019.mp4',
  'VID-20260820-WA0020.mp4',
  'VID-20260820-WA0022.mp4',
  'VID-20260820-WA0023.mp4',
  'VID-20260820-WA0026.mp4',
  'VID-20260825-WA0000.mp4',
  'VID-20260826-WA0001.mp4',
  'VID-20260826-WA0019.mp4',
  'VID-20260913-WA0008.mp4',
  'VID-20260914-WA0019.mp4',
  'VID-20260914-WA0025.mp4',
]
const sermonLibrary: Sermon[] = videoFiles.map((filename, index) => {
  const fileDate = filename.match(/^VID-(\d{4})(\d{2})(\d{2})-/)
  const date = fileDate
    ? new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(
        new Date(Number(fileDate[1]), Number(fileDate[2]) - 1, Number(fileDate[3])),
      )
    : 'Vidéo de la communauté'

  return {
    title: [
      'Culte et partage de la Parole',
      'Temps de louange et de communion',
      'Action de solidarité communautaire',
      'Louange en communauté',
    ][index] ?? `Archives vidéo de la communauté ${String(index + 1).padStart(2, '0')}`,
    date,
    speaker: 'Église AD Eben Ezer',
    theme: index === 2 ? 'Œuvres sociales' : index === 1 || index === 3 ? 'Louange' : 'Vie de l’église',
    summary: 'Revivez en vidéo un moment de foi et de communion de notre communauté à Ouahigouya.',
    videoSrc: `/media/${filename}`,
    poster: `/media/thumbnails/frame-${String(index + 1).padStart(2, '0')}.jpg`,
  }
})

const testimonials: Testimonial[] = [
  {
    name: 'M. B.',
    role: 'Membre de la communauté',
    quote: 'J’ai trouvé du repos spirituel et de la force dans les prières de l’église. C’est un lieu où la foi est vivante.',
  },
  {
    name: 'A. S.',
    role: 'Famille soutenue',
    quote: 'Le programme social nous a aidés à traverser des moments difficiles avec dignité et espérance.',
  },
  {
    name: 'R. T.',
    role: 'Jeune de la communauté',
    quote: 'Les études bibliques et les activités de jeunesse m’ont aidé à grandir dans ma foi et mon engagement.',
  },
]

const galleryItems: GalleryItem[] = [
  {
    title: 'Prédication et partage de la Parole',
    category: 'Cultes',
    date: sermonLibrary[0].date,
    image: '/media/thumbnails/frame-01.jpg',
  },
  {
    title: 'Chant et louange',
    category: 'Louanges',
    date: sermonLibrary[1].date,
    image: '/media/thumbnails/frame-02.jpg',
    videoSrc: sermonLibrary[1].videoSrc,
  },
  {
    title: 'Solidarité et accompagnement',
    category: 'Œuvres sociales',
    date: sermonLibrary[2].date,
    image: sermonLibrary[2].poster,
    videoSrc: sermonLibrary[2].videoSrc,
  },
  ...sermonLibrary.slice(3).map((sermon) => ({
    title: sermon.title,
    category: 'Communauté' as const,
    date: sermon.date,
    image: sermon.poster,
    videoSrc: sermon.videoSrc,
  })),
]

const socialNeeds = [
  { label: 'Aide alimentaire', amount: '250 000 FCFA', note: 'Contribuer aux besoins quotidiens des personnes accompagnées.' },
  { label: 'Vêtements et hygiène', amount: '180 000 FCFA', note: 'Apporter des vêtements et des produits de première nécessité.' },
  { label: 'Soutien aux enfants', amount: '200 000 FCFA', note: 'Participer à l’accompagnement des enfants et des familles.' },
  { label: 'Présence et écoute', amount: '80 000 FCFA', note: 'Offrir du temps, une présence bienveillante et un soutien moral.' },
]

const leadership = [
  { name: 'Le ministère pastoral', title: 'Enseignement et accompagnement spirituel', icon: '✦' },
  { name: 'La communauté', title: 'Prière, communion et vie fraternelle', icon: '♡' },
  { name: 'Le service solidaire', title: 'Engagement auprès des personnes vulnérables', icon: '＋' },
]

const galleryCategories = ['Tous', ...new Set(galleryItems.map((item) => item.category))]
const churchValues = ['Foi en Jésus-Christ', 'Amour du prochain', 'Prière et communion', 'Service et solidarité']

function App() {
  return (
    <div className="site-shell">
      <Header />
      <main className="page-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/worship" element={<WorshipPage />} />
          <Route path="/sermons" element={<SermonsPage />} />
          <Route path="/social" element={<SocialPage />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="topbar">
      <div className="topbar-inner wrap">
        <Link to="/" className="brand" aria-label="Accueil de l’église">
          <span className="brand-mark"><span>AD</span></span>
          <div>
            <strong>Église Évangélique AD</strong>
            <small>Eben Ezer — Ouahigouya</small>
          </div>
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id="primary-navigation"
          className={menuOpen ? 'nav mobile-open' : 'nav'}
          aria-label="Navigation principale"
          onClick={() => setMenuOpen(false)}
        >
          {navItems.filter((item) => item.path !== '/donate' && item.path !== '/testimonials' && item.path !== '/gallery').map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {item.label}
            </NavLink>
          ))}
          <details className="nav-more">
            <summary>Découvrir <span aria-hidden="true">⌄</span></summary>
            <div className="nav-dropdown">
              <NavLink to="/testimonials" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Témoignages</NavLink>
              <NavLink to="/gallery" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Galerie</NavLink>
            </div>
          </details>
        </nav>

        <Link to="/donate" className="primary-button small-button">
          <span>Soutenir</span><span className="button-arrow" aria-hidden="true">↗</span>
        </Link>
      </div>
    </header>
  )
}

function PageHeader({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = `${title} | Église Évangélique AD Eben Ezer`

    const descriptionMeta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    descriptionMeta?.setAttribute('content', description)

    const openGraphTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]')
    openGraphTitle?.setAttribute('content', document.title)

    const openGraphDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]')
    openGraphDescription?.setAttribute('content', description)
  }, [description, title])

  return (
    <section className="page-hero">
      <div className="wrap page-hero-inner">
        <div>
          <p className="eyebrow">Église AD Eben Ezer</p>
          <h1>{title}</h1>
          <p className="lead">{description}</p>
        </div>
      </div>
    </section>
  )
}

function HomePage() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-backdrop" aria-hidden="true">
          <img
            src={heroPhoto}
            alt=""
          />
        </div>
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow"><span className="eyebrow-line" /> Ouahigouya · Burkina Faso</p>
            <h1>Une foi vivante. Une espérance partagée.</h1>
            <p className="lead">
              Bienvenue à l’Église Évangélique AD Eben Ezer. Nous nous retrouvons autour de la Parole,
              de la prière et de l’amour du prochain, au cœur de Ouahigouya.
            </p>
            <div className="button-row">
              <Link to="/about" className="primary-button hero-primary">Découvrir notre église <span aria-hidden="true">↗</span></Link>
              <Link to="/sermons" className="secondary-button hero-secondary"><span className="play-icon">▶</span> Voir les prédications</Link>
            </div>
            <div className="hero-verse">
              <span className="verse-mark">“</span>
              <div>
                <p>Jusqu’ici l’Éternel nous a secourus.</p>
                <span>1 Samuel 7:12</span>
              </div>
            </div>
          </div>
          <div className="hero-side-note">
            <span className="side-note-dot" />
            <span>Foi · Espérance · Solidarité</span>
          </div>
        </div>
        <a href="#prochains-rendez-vous" className="scroll-cue" aria-label="Découvrir les prochains rendez-vous"><span /> Défiler</a>
      </section>

      <section id="prochains-rendez-vous" className="wrap section-spacing">
        <div className="section-heading">
          <p className="eyebrow">Nos rendez-vous de la semaine</p>
          <h2>Une place pour chacun, un chemin pour grandir</h2>
        </div>
        <div className="card-grid three-col">
          {regularPrograms.map((program) => (
            <article key={program.title} className="info-card image-card">
              <img src={program.image} alt="" />
              <div className="card-body">
                <span className="date-pill">{program.day}</span>
                <h3>{program.title}</h3>
                <p>{program.description}</p>
                <div className="meta-line">
                  <span>{program.time}</span>
                  <span>Ouahigouya</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap section-spacing alt-panel">
        <div className="section-heading split-header">
          <div>
            <p className="eyebrow">Dernières prédications</p>
            <h2>Messages pour l’édification de la communauté</h2>
          </div>
          <Link to="/sermons" className="text-link">Voir toute la vidéothèque →</Link>
        </div>
        <div className="card-grid three-col">
          {sermonLibrary.slice(0, 3).map((sermon) => (
            <article key={sermon.title} className="video-card">
              <div className="video-thumb">
                <video controls preload="none" poster={sermon.poster} aria-label={sermon.title}>
                  <source src={sermon.videoSrc} type="video/mp4" />
                  Votre navigateur ne prend pas en charge la lecture vidéo.
                </video>
              </div>
              <div className="card-body">
                <span className="tag">{sermon.theme}</span>
                <h3>{sermon.title}</h3>
                <p>{sermon.summary}</p>
                <div className="meta-line">
                  <span>{sermon.date}</span>
                  <span>{sermon.speaker}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap section-spacing">
        <div className="section-heading">
          <p className="eyebrow">Œuvres sociales</p>
          <h2>Un cœur missionnaire pour les plus vulnérables</h2>
        </div>
        <div className="social-banner">
          <div>
            <p className="eyebrow gold">Programme d’accompagnement</p>
            <h3>Près de 100 personnes déplacées internes sont accompagnées</h3>
            <p>
              À Ouahigouya, notre communauté se tient aux côtés de personnes déplacées internes.
              L’accompagnement est empreint d’écoute, de respect et de solidarité chrétienne.
            </p>
          </div>
          <Link to="/social" className="primary-button">Découvrir le programme</Link>
        </div>
      </section>

      <section className="wrap section-spacing alt-panel">
        <div className="section-heading">
          <p className="eyebrow">Paroles de la communauté</p>
          <h2>La foi se partage et l’espérance se transmet</h2>
        </div>
        <div className="card-grid three-col">
          {testimonials.map((item) => (
            <article key={item.name} className="quote-card">
              <div className="quote-mark">“</div>
              <p>{item.quote}</p>
              <div className="quote-author">
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap section-spacing donate-callout">
        <div>
          <p className="eyebrow">Appel à la générosité</p>
          <h2>Ensemble, nous pouvons soutenir la dignité et l’espérance</h2>
        </div>
        <Link to="/donate" className="primary-button">Faire un don</Link>
      </section>
    </>
  )
}

function AboutPage() {
  return (
    <>
      <PageHeader
        title="À propos de l’église"
        description="Une communauté chrétienne fidèle à la parole de Dieu, à la prière, à la mission et au service de la population."
      />

      <section className="wrap section-spacing">
        <div className="story-grid">
          <div>
            <p className="eyebrow">L’église à Ouahigouya</p>
            <h2>Ensemble, grandir dans la foi et servir notre prochain</h2>
            <p>
              Implantée à Ouahigouya, l’Église Évangélique Assemblées de Dieu Eben Ezer est une
              communauté de croyants réunis par leur foi en Jésus-Christ et leur attachement à la
              Parole de Dieu.
            </p>
            <p>
              La vie de l’église s’exprime dans la prière, l’adoration, l’enseignement biblique,
              l’évangélisation et le service. Sa vocation est de faire grandir chacun dans la foi et
              de témoigner de l’amour du Christ par une solidarité concrète.
            </p>
          </div>
          <img
            src={churchPhoto}
            alt="Portrait fourni par la communauté de l’église"
            className="story-image"
          />
        </div>
      </section>

      <section className="wrap section-spacing">
        <div className="card-grid three-col">
          <article className="info-panel">
            <p className="eyebrow">Notre vision</p>
            <h3>Une foi qui rayonne</h3>
            <p>Faire connaître l’Évangile et cultiver une espérance vivante au sein de la communauté.</p>
          </article>
          <article className="info-panel">
            <p className="eyebrow">Notre mission</p>
            <h3>Grandir et servir</h3>
            <p>Rassembler autour de la Parole, encourager la prière et servir le prochain avec amour.</p>
          </article>
          <article className="info-panel">
            <p className="eyebrow">Notre foi</p>
            <h3>Jésus-Christ au centre</h3>
            <p>Vivre selon l’Évangile dans la foi, la communion fraternelle et la solidarité.</p>
          </article>
        </div>
      </section>

      <section className="wrap section-spacing alt-panel">
        <div className="section-heading">
          <p className="eyebrow">Nos valeurs</p>
          <h2>Des principes qui orientent notre vie de communauté</h2>
        </div>
        <div className="value-list">
          {churchValues.map((value) => (
            <span key={value} className="value-tag">{value}</span>
          ))}
        </div>
      </section>

      <section className="wrap section-spacing">
        <div className="section-heading">
          <p className="eyebrow">Direction pastorale</p>
          <h2>Des forces complémentaires au service de l’église</h2>
        </div>
        <div className="card-grid three-col">
          {leadership.map((person) => (
            <article key={person.name} className="person-card">
              <div className="card-body">
                <span className="person-icon" aria-hidden="true">{person.icon}</span>
                <h3>{person.name}</h3>
                <p>{person.title}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

function WorshipPage() {
  return (
    <>
      <PageHeader
        title="Cultes et activités"
        description="Des moments de rencontre, de louange, de prière et d’enseignement pour toute la communauté."
      />

      <section className="wrap section-spacing">
        <div className="schedule-grid">
          {regularPrograms.map((program, index) => (
            <article key={program.title} className={index === 0 ? 'schedule-card highlighted' : 'schedule-card'}>
              <p className="eyebrow">{program.day}</p>
              <h3>{program.title}</h3>
              <p>{program.description}</p>
              <div className="meta-line"><span>{program.time}</span><span>Ouahigouya</span></div>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap section-spacing alt-panel">
        <div className="section-heading">
          <p className="eyebrow">La vie de l’église</p>
          <h2>Grandir et servir ensemble</h2>
        </div>
        <div className="card-grid three-col">
          {[
            { title: 'Jeunesse', description: 'Un espace de rencontre et d’édification pour encourager les jeunes à grandir dans la foi.' },
            { title: 'Femmes', description: 'Des temps de partage, de prière et de soutien fraternel au sein de la communauté.' },
            { title: 'Évangélisation et conventions', description: 'Des occasions de partager l’Évangile et de se retrouver autour de la Parole de Dieu.' },
          ].map((activity) => (
            <article key={activity.title} className="schedule-card">
              <p className="eyebrow">Communauté</p>
              <h3>{activity.title}</h3>
              <p>{activity.description}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

function SermonsPage() {
  const [search, setSearch] = useState('')

  const filteredSermons = useMemo(
    () =>
      sermonLibrary.filter((sermon) =>
        `${sermon.title} ${sermon.theme} ${sermon.speaker}`.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  )

  return (
    <>
      <PageHeader
        title="Prédications et vidéos"
        description="Une vidéothèque chrétienne pour encourager la foi, la méditation et l’édification de la communauté."
      />

      <section className="wrap section-spacing">
        <div className="toolbar">
          <div className="search-box">
            <label htmlFor="sermon-search">Recherche</label>
            <input
              id="sermon-search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Rechercher une prédication ou une vidéo"
            />
          </div>
        </div>

        <div className="card-grid two-col">
          {filteredSermons.map((sermon) => (
            <article key={sermon.title} className="video-card large-card">
              <div className="video-thumb">
                <video controls preload="none" poster={sermon.poster} aria-label={sermon.title}>
                  <source src={sermon.videoSrc} type="video/mp4" />
                  Votre navigateur ne prend pas en charge la lecture vidéo.
                </video>
              </div>
              <div className="card-body">
                <span className="tag">{sermon.theme}</span>
                <h3>{sermon.title}</h3>
                <p>{sermon.summary}</p>
                <div className="meta-line">
                  <span>{sermon.date}</span>
                  <span>{sermon.speaker}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
        {filteredSermons.length === 0 && (
          <p className="empty-state">Aucun média ne correspond à cette recherche. Essayez un autre mot-clé.</p>
        )}
      </section>
    </>
  )
}

function SocialPage() {
  return (
    <>
      <PageHeader
        title="Œuvres sociales et humanitaires"
        description="Une attention particulière à l’accompagnement des personnes déplacées internes et des familles vulnérables."
      />

      <section className="wrap section-spacing">
        <div className="story-grid">
          <div>
            <p className="eyebrow">Notre engagement</p>
            <h2>Accueillir, écouter et accompagner avec respect</h2>
            <p>
              À travers son programme social, l’Église AD Eben Ezer accompagne près de 100 personnes
              déplacées internes au Burkina Faso. Notre engagement s’enracine dans l’amour du
              prochain, la solidarité et le respect de la dignité de chaque personne.
            </p>
            <p>
              Nous privilégions une présence attentive et un soutien fraternel. Les images et les
              récits des personnes accompagnées sont partagés avec respect, sans divulguer
              d’informations personnelles.
            </p>
          </div>
          <img src={socialPhoto} alt="Action de solidarité auprès de familles de la communauté" className="story-image" />
        </div>
      </section>

      <section className="wrap section-spacing alt-panel">
        <div className="section-heading">
          <p className="eyebrow">Nos actions</p>
          <h2>Une solidarité qui répond aux besoins essentiels</h2>
        </div>
        <div className="card-grid four-col">
          {socialNeeds.map((need) => (
            <article key={need.label} className="info-card minimal-card">
              <div className="card-body">
                <h3>{need.label}</h3>
                <strong>Objectif : {need.amount}</strong>
                <p>{need.note}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap section-spacing">
        <div className="section-heading">
          <p className="eyebrow">Comment aider ?</p>
          <h2>Chaque geste compte</h2>
        </div>
        <div className="help-grid">
          <div className="help-card">Faire un don financier</div>
          <div className="help-card">Offrir des denrées alimentaires</div>
          <div className="help-card">Donner vêtements et produits de première nécessité</div>
          <div className="help-card">Contribuer au matériel scolaire</div>
          <div className="help-card">Construire un partenariat solidaire</div>
          <div className="help-card">Donner de son temps comme bénévole</div>
        </div>
      </section>
    </>
  )
}

function DonatePage() {
  return (
    <>
      <PageHeader
        title="Faire un don"
        description="Votre générosité soutient la mission de l’église et les actions de solidarité menées auprès des personnes vulnérables."
      />

      <section className="wrap section-spacing donation-grid">
        <div className="donation-panel">
          <p className="eyebrow">Votre soutien</p>
          <h2>Un don, un geste de foi et de solidarité</h2>
          <p>
            Chaque contribution aide l’Église AD Eben Ezer à poursuivre sa mission spirituelle et
            son accompagnement des personnes déplacées internes et des familles vulnérables.
          </p>
          <ul className="bullet-list">
            <li>Œuvres sociales et aide aux familles</li>
            <li>Accompagnement des personnes déplacées internes</li>
            <li>Vie spirituelle et activités de l’église</li>
            <li>Actions au service de la communauté de Ouahigouya</li>
          </ul>
          <p className="eyebrow">Montants de soutien proposés</p>
          <div className="amount-row donation-amounts" aria-label="Montants de don proposés">
            {[2000, 5000, 10000, 25000].map((amount) => (
              <span className="amount-option" key={amount}>{amount.toLocaleString('fr-FR')} FCFA</span>
            ))}
          </div>
        </div>

        <div className="form-panel">
          <span className="donation-icon" aria-hidden="true">♡</span>
          <h3>Donner en toute confiance</h3>
          <p>
            Orange Money, Moov Money, carte bancaire, virement et don en espèces sont les moyens de
            contribution proposés par l’église.
          </p>
          <p className="payment-notice">
            Le site ne collecte ni coordonnées bancaires ni paiements en ligne. Pour faire un don,
            rendez-vous à l’église ou demandez directement aux responsables les modalités de
            contribution.
          </p>
          <Link to="/contact" className="primary-button">Voir les horaires et la localisation</Link>
        </div>
      </section>

      <section className="wrap section-spacing alt-panel">
        <div className="section-heading">
          <p className="eyebrow">Donner autrement</p>
          <h2>La solidarité prend plusieurs formes</h2>
        </div>
        <div className="help-grid">
          <div className="help-card">Don financier</div>
          <div className="help-card">Don de denrées alimentaires</div>
          <div className="help-card">Vêtements et produits essentiels</div>
          <div className="help-card">Matériel scolaire</div>
          <div className="help-card">Partenariat ou bénévolat</div>
          <div className="help-card">Prière et accompagnement</div>
        </div>
      </section>

      <section className="wrap section-spacing">
        <div className="info-panel transparency-panel">
          <p className="eyebrow">Transparence</p>
          <h2>Une générosité au service des personnes</h2>
          <p>
            Les dons sont destinés aux activités de l’église et à l’accompagnement solidaire. Les
            responsables rendent compte de leur utilisation à la communauté.
          </p>
        </div>
      </section>
    </>
  )
}

function TestimonialsPage() {
  return (
    <>
      <PageHeader
        title="Témoignages"
        description="Des récits de foi, de gratitude et de transformation qui inspirent la communauté."
      />

      <section className="wrap section-spacing">
        <div className="card-grid three-col">
          {testimonials.map((item) => (
            <article key={item.name} className="quote-card large-quote">
              <div className="quote-mark">“</div>
              <p>{item.quote}</p>
              <div className="quote-author">
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

function GalleryPage() {
  const [category, setCategory] = useState('Tous')

  const filteredGallery =
    category === 'Tous'
      ? galleryItems
      : galleryItems.filter((item) => item.category === category)

  return (
    <>
      <PageHeader
        title="Galerie"
        description="Un aperçu des cultes, des célébrations, des actions sociales et des moments marquants du ministère."
      />

      <section className="wrap section-spacing">
        <div className="filter-row">
          {galleryCategories.map((item) => (
            <button
              key={item}
              type="button"
              className={category === item ? 'filter-pill active' : 'filter-pill'}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="card-grid three-col">
          {filteredGallery.map((item) => (
            <article key={`${item.title}-${item.date}`} className="gallery-card">
              {item.videoSrc ? (
                <video controls preload="none" poster={item.image} aria-label={item.title}>
                  <source src={item.videoSrc} type="video/mp4" />
                  Votre navigateur ne prend pas en charge la lecture vidéo.
                </video>
              ) : (
                <img src={item.image} alt={item.title} />
              )}
              <div className="card-body">
                <span className="tag">{item.category}</span>
                <h3>{item.title}</h3>
                <p>{item.date}</p>
              </div>
            </article>
          ))}
        </div>
        {filteredGallery.length === 0 && (
          <p className="empty-state">La galerie s’enrichit au fil des activités. Découvrez les vidéos disponibles dans « Tous ».</p>
        )}
      </section>
    </>
  )
}

function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact et localisation"
        description="L’Église Évangélique AD Eben Ezer vous accueille à Ouahigouya, au Burkina Faso."
      />

      <section className="wrap section-spacing contact-grid">
        <div className="info-panel contact-details">
          <p className="eyebrow">Nous trouver</p>
          <h2>Ouahigouya, Burkina Faso</h2>
          <p>Retrouvez l’équipe de l’église lors des cultes et des rendez-vous hebdomadaires.</p>
          <Link to="/worship" className="primary-button">Voir les horaires des cultes</Link>
        </div>

        <div className="info-panel contact-details">
          <p className="eyebrow">Une communauté ouverte</p>
          <h2>Nous serons heureux de vous accueillir</h2>
          <p>
            Que vous souhaitiez découvrir l’église, prendre part à un culte ou vous engager dans
            une action solidaire, vous êtes les bienvenus.
          </p>
          <Link to="/social" className="text-link">Découvrir nos œuvres sociales →</Link>
        </div>
      </section>

      <section className="wrap section-spacing">
        <div className="section-heading">
          <p className="eyebrow">Horaires de rassemblement</p>
          <h2>Retrouvons-nous cette semaine</h2>
        </div>
        <div className="card-grid three-col">
          {regularPrograms.map((program) => (
            <article key={program.title} className="schedule-card">
              <p className="eyebrow">{program.day}</p>
              <h3>{program.title}</h3>
              <p>{program.time}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap section-spacing map-panel">
        <iframe
          title="Carte de la ville de Ouahigouya"
          src="https://www.google.com/maps?q=Ouahigouya%20Burkina%20Faso&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <p className="map-caption">Repère géographique : Ouahigouya, Burkina Faso.</p>
      </section>
    </>
  )
}

function AdminPage() {
  return (
    <>
      <PageHeader title="Espace de gestion" description="Les contenus de l’église sont présentés sur ce site." />
      <section className="wrap section-spacing">
        <div className="info-panel">
          <p className="eyebrow">Gestion du site</p>
          <h2>Un accès réservé et protégé</h2>
          <p>
            La publication et la modification des contenus sont réservées aux responsables de
            l’église. Cet espace ne demande aucun mot de passe et ne donne pas accès à un tableau
            de bord non sécurisé.
          </p>
        </div>
      </section>
    </>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <strong>Église Évangélique AD Eben Ezer</strong>
          <p>Ouahigouya, Burkina Faso</p>
        </div>
        <div>
          <p>« Jusqu’ici l’Éternel nous a secourus. » — 1 Samuel 7:12</p>
        </div>
        <div>
          <Link to="/contact" className="text-link">Nous contacter</Link>
        </div>
      </div>
    </footer>
  )
}

function NotFoundPage() {
  return (
    <PageHeader
      title="Page introuvable"
      description="Cette page n’existe pas. Retrouvez les cultes, les prédications et les informations de l’église depuis l’accueil."
    />
  )
}

export default App
