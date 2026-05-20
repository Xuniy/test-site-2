import {
  type CSSProperties,
  type FormEvent,
  type ReactNode,
  type SyntheticEvent,
  useEffect,
  useState,
} from "react"
import {
  ArrowUpRight,
  Blocks,
  Building2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  DraftingCompass,
  Factory,
  Grid2X2,
  Mail,
  MapPin,
  Menu,
  Phone,
  Ruler,
  Send,
  ShieldCheck,
  X,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

function publicAsset(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`
}

const images = {
  hero: publicAsset("header.png"),
  services:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCJeZKboTxG999Pnqifj9KlfuEBfkFXVs1ZdOXlhtqXpfWWT-uliciAh_Np2jVeY_Y_0wN8vbe93Yz2xtbwRL3Dtkt0YFw340SzDSwwEpeEaz3PjENWRX1OsdQw2p6IuNMWkUXvLhAjVYdqjNM7VbH2Rb7nB7fd44I2vNg5My4xZfP-a3Ezq6Jcsv3AWRgOL4J_tecs8H10k6tU06GL0gT0dKwQMHoeNkNDWiP7GtMy5EGge4INZDwnIQCEfeBSDD1FvgWqEv5aHdI0",
  tower:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDn0kAjWqX6CX0pMHXMO7YQ4xpTlH8oU843hbJahpdkumifPObPVT9-DaCLS4reLTVZ7FUWGOvvijODeTOfrFylYIxM4mxmQ40z0bfvJ0WvpeL0LeS3s437oIpQWow_fJ1gSacnR16vEkVt2L0gSXs9-Pd8-7JCs2LNXmIcU4wCGRK4WFtK-Xb2B8GQqFr3Rx2yqLUad_wuEonE2Kln5i5HqtegThkiSHMaUE3ANxccHCtEbc6QQnsOrDYksi0NA7IvKk9UoQ5HJ7KR",
  residence:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA_YneZVwl3-SivuuJ7mtOvojdAk6bRT4GZ95E3Ng7hzdbQ2mylcoB-L6fpEb8x5z_9TyzNI0nk0DkXcIA0S2U4NYcr3xPiyh9rUnryRRm8zasUeCCdRIM2axYwPmdvXqXW41K3QN6jAOi-Q98Cie5MBKeiPxMUdS2daQSXYDVSPxh1QCGd-8Q9dShT3Vwik-Ugx72GOYhIQ-Gk8fV8g5NSlbuyb-lj4HEa_DfHpRmQ8Gxe6RRNVTyLpXy50Qo63LKoUbEqSzEfsEFy",
  warehouse:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCADy7C-o41XZTmnDwIsjv8K_kM7811Q9eTgR6c2OUcyBTs8mvTG9-1WOCRbt_rCRdY9PlPLduktLywQgA9p3TillClUvMulPbSkqeIxKBTkB8LbLYfQ3r-q6Y3d5XXoEHVhfsjYP0U6WZlmf5MV2ehcAY-znbmNhNUgMftSWJxui0diba1HmqB4o3bIyNyNKNniURAlxRnizMieMLv__MZWDguhyQhlLP9OZbupUKpQxiTOPUk4smfkCrFk6TgDJENr5oOsmxxgrFt",
}

const brandLogoPath = publicAsset("logo.png")

type Language = "nl" | "fr"

const frenchTranslations: Record<string, string> = {
  "Over ons": "À propos",
  Diensten: "Services",
  Projecten: "Projets",
  Contact: "Contact",
  "Offerte aanvragen": "Demander un devis",
  Offerte: "Devis",
  "Menu sluiten": "Fermer le menu",
  "Menu openen": "Ouvrir le menu",
  Hoofdnavigatie: "Navigation principale",
  Taalkeuze: "Choix de langue",
  "Building Engineering sinds 2009": "Ingénierie du bâtiment depuis 2009",
  "Solid Structure. Strong Partnership.": "Structure solide. Partenariat durable.",
  "Ruwbouwwerken voor grote en kleine investeringen. CONSTRUKTON bouwt aan voorspelbare uitvoering voor ontwikkelaars, hoofdaannemers en professionele investeerders.":
    "Travaux de gros oeuvre pour grands et petits investissements. CONSTRUKTON construit une exécution prévisible pour promoteurs, entrepreneurs généraux et investisseurs professionnels.",
  "Neem contact op": "Nous contacter",
  "Bekijk projecten": "Voir les projets",
  "jaar ervaring": "ans d'expérience",
  bouwpartners: "partenaires construction",
  kernactiviteiten: "activités clés",
  marktfocus: "marché cible",
  Waarden: "Valeurs",
  "Waarom Construkton?": "Pourquoi Construkton ?",
  "Een compacte, technisch sterke partner voor ruwbouwprojecten waar timing, maatvoering en communicatie rechtstreeks impact hebben op rendement.":
    "Un partenaire compact et techniquement solide pour les projets de gros oeuvre où le timing, les cotes et la communication ont un impact direct sur le rendement.",
  Ervaring: "Expérience",
  "Sinds 2009 realiseren wij bouwprojecten voor zakelijke partners op de Belgische markt.":
    "Depuis 2009, nous réalisons des projets de construction pour des partenaires professionnels sur le marché belge.",
  Specialisatie: "Spécialisation",
  "Focus op ruwbouwwerken, gewapend beton, metselwerk en gevelwerk.":
    "Un focus sur le gros oeuvre, le béton armé, la maçonnerie et les travaux de façade.",
  Flexibiliteit: "Flexibilité",
  "Werken in zowel regie-model als totaalaanneming inclusief materiaal.":
    "Intervention en régie ou en entreprise globale, matériaux compris.",
  "B2B Betrouwbaarheid": "Fiabilité B2B",
  "Wij staan voor tijdigheid, heldere communicatie en voorspelbare uitvoering.":
    "Nous garantissons ponctualité, communication claire et exécution prévisible.",
  Competenties: "Compétences",
  "Onze belangrijkste activiteiten": "Nos principales activités",
  "Wij bieden volledige technische en uitvoerende ondersteuning in elke fase van de constructie van het gebouw.":
    "Nous offrons un soutien technique et opérationnel complet à chaque étape de la construction du bâtiment.",
  "Grond- en funderingswerken": "Terrassement et fondations",
  "Voorbereiding, wapening, bekisting en controle op uitvoeringsniveau.":
    "Préparation, ferraillage, coffrage et contrôle au niveau de l'exécution.",
  "Betonconstructies en vloerplaten": "Structures en béton et dalles",
  "Technische realisatie van structurele betonwerken voor grotere volumes.":
    "Réalisation technique de travaux structurels en béton pour des volumes importants.",
  "Montage van prefab betonelementen": "Montage d'éléments préfabriqués en béton",
  "Nauwkeurige plaatsing met oog voor planning, veiligheid en tolerantie.":
    "Pose précise avec attention au planning, à la sécurité et aux tolérances.",
  Metselwerken: "Maçonnerie",
  "Dragend en niet-dragend metselwerk binnen een gecontroleerde werfflow.":
    "Maçonnerie porteuse et non porteuse dans un flux de chantier maîtrisé.",
  Realisaties: "Réalisations",
  "Geselecteerde projecten": "Projets sélectionnés",
  "Bespreek uw project": "Discuter de votre projet",
  "Bekijk foto's": "Voir les photos",
  "Toon projectgroep": "Afficher le groupe de projets",
  Projectgalerij: "Galerie du projet",
  "Galerij sluiten": "Fermer la galerie",
  "Vorige foto": "Photo précédente",
  "Volgende foto": "Photo suivante",
  "Toon foto": "Afficher la photo",
  Referenties: "Références",
  "Wat zakelijke partners waarderen": "Ce que nos partenaires professionnels apprécient",
  "De samenwerking met CONSTRUKTON bij de realisatie van de funderingen voor ons technologiepark verliep vlekkeloos. We waarderen de stiptheid en technische kennis.":
    "La collaboration avec CONSTRUKTON pour les fondations de notre parc technologique s'est déroulée sans accroc. Nous apprécions leur ponctualité et leur expertise technique.",
  "Technisch Directeur, BuildCorp": "Directeur technique, BuildCorp",
  "De precisie in de betonconstructies bij het Zenith Tower project was cruciaal. Construkton leverde kwaliteit die onze verwachtingen overtrof.":
    "La précision des structures en béton sur le projet Zenith Tower était cruciale. Construkton a livré une qualité supérieure à nos attentes.",
  "Hoofdaannemer, PrimeAssets": "Entrepreneur général, PrimeAssets",
  "Weinig onderaannemers begrijpen de specifieke kenmerken van moderne bouw zo goed als zij. Flexibiliteit in actie en een sterke organisatie van het werk.":
    "Peu de sous-traitants comprennent aussi bien les spécificités de la construction moderne. Flexibilité sur le terrain et excellente organisation du travail.",
  "Particuliere Investeerder": "Investisseuse privée",
  "Laten we praten over uw project": "Parlons de votre projet",
  "Ons technisch bureau staat klaar om een eerste prijsopgave op te stellen op basis van de ingediende documentatie.":
    "Notre bureau technique est prêt à établir une première estimation sur la base de la documentation transmise.",
  Kantooradres: "Adresse du bureau",
  "Architectenlaan 12, 1000 Brussel": "Avenue des Architectes 12, 1000 Bruxelles",
  "E-mail": "E-mail",
  Telefonisch: "Téléphone",
  "Naam / Bedrijf": "Nom / Entreprise",
  "Jan Peeters": "Jean Peeters",
  "Zakelijk e-mailadres": "Adresse e-mail professionnelle",
  "naam@bedrijf.be": "nom@entreprise.be",
  "Bericht / Omvang van de werken": "Message / Étendue des travaux",
  "Beschrijf kort de parameters van de investering...":
    "Décrivez brièvement les paramètres de l'investissement...",
  "Bedankt. Uw aanvraag is genoteerd voor opvolging.":
    "Merci. Votre demande a bien été enregistrée pour suivi.",
  "Aanvraag verzenden": "Envoyer la demande",
  Privacybeleid: "Politique de confidentialité",
  Samenwerkingsvoorwaarden: "Conditions de collaboration",
  Carrière: "Carrière",
  Persbureau: "Presse",
  "© 2026 CONSTRUKTON. Alle rechten voorbehouden.":
    "© 2026 CONSTRUKTON. Tous droits réservés.",
  "Antwerpen | Volledige ruwbouw": "Anvers | Gros oeuvre complet",
  "Brussel | Betonstructuur en gevelwerk":
    "Bruxelles | Structure béton et façade",
  "Gent | Industriële ruwbouw": "Gand | Gros oeuvre industriel",
  "Mechelen | Funderingswerken": "Malines | Travaux de fondation",
  "Brussel | Betonconstructies": "Bruxelles | Structures en béton",
  "Hasselt | Industriële vloerplaten": "Hasselt | Dalles industrielles",
  "Leuven | Prefab montage": "Louvain | Montage préfabriqué",
  "Namen | Metselwerk en gevelwerk": "Namur | Maçonnerie et façade",
  "Oostende | Structurele ruwbouw": "Ostende | Gros oeuvre structurel",
  "Kortrijk | Totaalaanneming ruwbouw":
    "Courtrai | Entreprise globale de gros oeuvre",
  "Hoge moderne toren met glasgevels in stedelijke context":
    "Tour moderne élevée avec façades vitrées en contexte urbain",
  "Moderne donkere villa met betonmuren en grote ramen":
    "Villa contemporaine sombre avec murs en béton et grandes baies vitrées",
  "Minimalistisch logistiek gebouw met betonnen lijnen en grote poorten":
    "Bâtiment logistique minimaliste avec lignes en béton et grandes portes",
  "Betonnen binnenstructuur met openingen en werflicht":
    "Structure intérieure en béton avec ouvertures et lumière de chantier",
  "Modern kantoorgebouw met strakke gevel en stedelijke reflecties":
    "Immeuble de bureaux moderne avec façade nette et reflets urbains",
  "Logistiek gebouw met betonnen structuur en grote toegangspoorten":
    "Bâtiment logistique avec structure en béton et grands accès",
  "Ruwbouwstructuur met prefab betonelementen en diepe schaduw":
    "Structure de gros oeuvre avec éléments préfabriqués en béton et ombres profondes",
  "Hedendaagse residentiële architectuur met donkere betonlijnen":
    "Architecture résidentielle contemporaine avec lignes de béton sombres",
  "Hoogbouwvolume met glas, beton en verticale ritmiek":
    "Volume en hauteur avec verre, béton et rythme vertical",
  "Grootschalig utilitair gebouw met minimalistische betonafwerking":
    "Grand bâtiment utilitaire avec finition béton minimaliste",
  "Moderne bouwplaats met gewapend beton, staalstructuren en kranen":
    "Chantier moderne avec béton armé, structures métalliques et grues",
  "Interieur van een betonnen gebouw in aanbouw met daglicht door structurele openingen":
    "Intérieur d'un bâtiment en béton en construction avec lumière naturelle à travers les ouvertures structurelles",
}

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "nl"

  return new URLSearchParams(window.location.search).get("lang") === "fr"
    ? "fr"
    : "nl"
}

function t(language: Language, text: string) {
  return language === "fr" ? frenchTranslations[text] ?? text : text
}

function projectGallery(slug: string) {
  return [
    publicAsset(`projects/${slug}/01.jpg`),
    publicAsset(`projects/${slug}/02.jpg`),
    publicAsset(`projects/${slug}/03.jpg`),
    publicAsset(`projects/${slug}/04.jpg`),
    publicAsset(`projects/${slug}/05.jpg`),
  ]
}

const navItems = [
  { label: "Over ons", href: "#about" },
  { label: "Diensten", href: "#services" },
  { label: "Projecten", href: "#portfolio" },
  { label: "Referenties", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
]

const values = [
  {
    number: "01",
    title: "Ervaring",
    text: "Sinds 2009 realiseren wij bouwprojecten voor zakelijke partners op de Belgische markt.",
    icon: Clock3,
  },
  {
    number: "02",
    title: "Specialisatie",
    text: "Focus op ruwbouwwerken, gewapend beton, metselwerk en gevelwerk.",
    icon: Ruler,
  },
  {
    number: "03",
    title: "Flexibiliteit",
    text: "Werken in zowel regie-model als totaalaanneming inclusief materiaal.",
    icon: Blocks,
  },
  {
    number: "04",
    title: "B2B Betrouwbaarheid",
    text: "Wij staan voor tijdigheid, heldere communicatie en voorspelbare uitvoering.",
    icon: ShieldCheck,
  },
]

const services: Array<{ title: string; detail: string; icon: LucideIcon }> = [
  {
    title: "Grond- en funderingswerken",
    detail: "Voorbereiding, wapening, bekisting en controle op uitvoeringsniveau.",
    icon: Building2,
  },
  {
    title: "Betonconstructies en vloerplaten",
    detail: "Technische realisatie van structurele betonwerken voor grotere volumes.",
    icon: DraftingCompass,
  },
  {
    title: "Montage van prefab betonelementen",
    detail: "Nauwkeurige plaatsing met oog voor planning, veiligheid en tolerantie.",
    icon: Factory,
  },
  {
    title: "Metselwerken",
    detail: "Dragend en niet-dragend metselwerk binnen een gecontroleerde werfflow.",
    icon: Grid2X2,
  },
]

const projects = [
  {
    slug: "zenith-tower",
    title: "The Zenith Tower",
    meta: "Antwerpen | Volledige ruwbouw",
    image: images.tower,
    gallery: projectGallery("zenith-tower"),
    alt: "Hoge moderne toren met glasgevels in stedelijke context",
    featured: true,
  },
  {
    slug: "obsidian-residence",
    title: "The Obsidian Residence",
    meta: "Brussel | Betonstructuur en gevelwerk",
    image: images.residence,
    gallery: projectGallery("obsidian-residence"),
    alt: "Moderne donkere villa met betonmuren en grote ramen",
  },
  {
    slug: "nexus-logistics",
    title: "Logistiek Centrum Nexus",
    meta: "Gent | Industriële ruwbouw",
    image: images.warehouse,
    gallery: projectGallery("nexus-logistics"),
    alt: "Minimalistisch logistiek gebouw met betonnen lijnen en grote poorten",
  },
  {
    slug: "atlas-business-campus",
    title: "Atlas Business Campus",
    meta: "Mechelen | Funderingswerken",
    image: images.services,
    gallery: projectGallery("atlas-business-campus"),
    alt: "Betonnen binnenstructuur met openingen en werflicht",
  },
  {
    slug: "rivage-offices",
    title: "Rivage Offices",
    meta: "Brussel | Betonconstructies",
    image: images.tower,
    gallery: projectGallery("rivage-offices"),
    alt: "Modern kantoorgebouw met strakke gevel en stedelijke reflecties",
  },
  {
    slug: "northline-distribution-hub",
    title: "Northline Distribution Hub",
    meta: "Hasselt | Industriële vloerplaten",
    image: images.warehouse,
    gallery: projectGallery("northline-distribution-hub"),
    alt: "Logistiek gebouw met betonnen structuur en grote toegangspoorten",
  },
  {
    slug: "vesta-parking-structure",
    title: "Vesta Parking Structure",
    meta: "Leuven | Prefab montage",
    image: images.services,
    gallery: projectGallery("vesta-parking-structure"),
    alt: "Ruwbouwstructuur met prefab betonelementen en diepe schaduw",
  },
  {
    slug: "terra-nova-residences",
    title: "Terra Nova Residences",
    meta: "Namen | Metselwerk en gevelwerk",
    image: images.residence,
    gallery: projectGallery("terra-nova-residences"),
    alt: "Hedendaagse residentiële architectuur met donkere betonlijnen",
  },
  {
    slug: "meridian-hotel",
    title: "Meridian Hotel",
    meta: "Oostende | Structurele ruwbouw",
    image: images.tower,
    gallery: projectGallery("meridian-hotel"),
    alt: "Hoogbouwvolume met glas, beton en verticale ritmiek",
  },
  {
    slug: "apex-health-hub",
    title: "Apex Health Hub",
    meta: "Kortrijk | Totaalaanneming ruwbouw",
    image: images.warehouse,
    gallery: projectGallery("apex-health-hub"),
    alt: "Grootschalig utilitair gebouw met minimalistische betonafwerking",
  },
]

type Project = (typeof projects)[number]

const testimonials = [
  {
    quote:
      "De samenwerking met CONSTRUKTON bij de realisatie van de funderingen voor ons technologiepark verliep vlekkeloos. We waarderen de stiptheid en technische kennis.",
    name: "Andries Verbeeck",
    role: "Technisch Directeur, BuildCorp",
  },
  {
    quote:
      "De precisie in de betonconstructies bij het Zenith Tower project was cruciaal. Construkton leverde kwaliteit die onze verwachtingen overtrof.",
    name: "Marc Willems",
    role: "Hoofdaannemer, PrimeAssets",
  },
  {
    quote:
      "Weinig onderaannemers begrijpen de specifieke kenmerken van moderne bouw zo goed als zij. Flexibiliteit in actie en een sterke organisatie van het werk.",
    name: "Katrien Peeters",
    role: "Particuliere Investeerder",
  },
]

type RevealStyle = CSSProperties & { "--reveal-delay"?: string }

function revealDelay(milliseconds: number): RevealStyle {
  return { "--reveal-delay": `${milliseconds}ms` }
}

function App() {
  const [language] = useState<Language>(getInitialLanguage)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formState, setFormState] = useState<"idle" | "sent">("idle")

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  useEffect(() => {
    const revealElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    )

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealElements.forEach((element) => element.classList.add("is-visible"))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.16 },
    )

    revealElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormState("sent")
    event.currentTarget.reset()
  }

  return (
    <div className="min-h-screen bg-background font-body text-on-surface antialiased">
      <Navigation
        isOpen={isMenuOpen}
        language={language}
        onOpenChange={setIsMenuOpen}
      />
      <main>
        <Hero language={language} />
        <WhyUs language={language} />
        <Services language={language} />
        <Portfolio language={language} />
        <Testimonials language={language} />
        <Contact
          formState={formState}
          language={language}
          onSubmit={handleSubmit}
        />
      </main>
      <Footer language={language} />
    </div>
  )
}

function Navigation({
  isOpen,
  language,
  onOpenChange,
}: {
  isOpen: boolean
  language: Language
  onOpenChange: (open: boolean) => void
}) {
  return (
    <header className="site-nav fixed left-0 top-0 z-50 w-full border-b border-primary/5 bg-background/[.82] backdrop-blur-xl">
      <nav
        className="mx-auto flex max-w-[1920px] items-center justify-between gap-8 px-6 py-5 md:px-12"
        aria-label={t(language, "Hoofdnavigatie")}
      >
        <a
          href="#top"
          className="group flex shrink-0 items-center gap-3 text-primary transition-opacity duration-200 hover:opacity-70"
          aria-label="CONSTRUKTON home"
        >
          <img
            src={brandLogoPath}
            alt=""
            aria-hidden="true"
            className="hidden h-10 max-w-[8.5rem] object-contain min-[460px]:block"
            onError={(event) => {
              event.currentTarget.style.display = "none"
              const divider = event.currentTarget.nextElementSibling
              if (divider instanceof HTMLElement) {
                divider.style.display = "none"
              }
            }}
          />
          <span
            className="hidden h-8 w-px bg-outline-variant min-[460px]:block"
            aria-hidden="true"
          />
          <span className="whitespace-nowrap text-2xl font-bold tracking-normal">
            CONSTRUKTON
          </span>
        </a>

        <div className="header-actions">
          <div className="desktop-nav min-w-0 items-center gap-8">
            <div className="flex items-center gap-8 border-r border-outline-variant pr-8">
              {navItems.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "whitespace-nowrap border-b-2 border-transparent pb-1 text-sm uppercase tracking-[0.18em] text-on-surface-variant transition-all duration-300 hover:border-primary hover:text-primary",
                    index === 0 && "border-primary text-primary",
                  )}
                >
                  {t(language, item.label)}
                </a>
              ))}
            </div>
            <LanguageSwitch language={language} />
          </div>

          <div className="desktop-cta shrink-0 items-center">
            <Button asChild>
              <a href="#contact">{t(language, "Offerte aanvragen")}</a>
            </Button>
          </div>

          <button
            className="burger-trigger inline-flex size-12 transform-gpu items-center justify-center border border-outline-variant text-primary transition-all duration-200 hover:-translate-y-0.5 hover:bg-surface-container active:translate-y-0"
            type="button"
            aria-label={t(language, isOpen ? "Menu sluiten" : "Menu openen")}
            aria-expanded={isOpen}
            onClick={() => onOpenChange(!isOpen)}
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <div
        className={cn(
          "mobile-menu-panel grid border-t border-outline-variant bg-background transition-[grid-template-rows] duration-300",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="px-6 py-6">
            <div className="flex flex-col">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="border-b border-outline-variant py-4 text-sm font-bold uppercase tracking-[0.18em] text-primary"
                  onClick={() => onOpenChange(false)}
                >
                  {t(language, item.label)}
                </a>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between">
              <LanguageSwitch language={language} />
              <Button asChild size="default">
                <a href="#contact" onClick={() => onOpenChange(false)}>
                  {t(language, "Offerte")}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function LanguageSwitch({ language }: { language: Language }) {
  return (
    <div
      className="flex shrink-0 items-center gap-4 whitespace-nowrap"
      aria-label={t(language, "Taalkeuze")}
    >
      <a
        className={cn(
          "text-xs font-bold tracking-[0.2em] transition-colors hover:text-primary",
          language === "nl" ? "text-primary" : "text-on-surface-variant",
        )}
        href="?lang=nl"
      >
        NL
      </a>
      <span className="h-4 w-px bg-outline-variant" aria-hidden="true" />
      <a
        className={cn(
          "text-xs font-bold tracking-[0.2em] transition-colors hover:text-primary",
          language === "fr" ? "text-primary" : "text-on-surface-variant",
        )}
        href="?lang=fr"
      >
        FR
      </a>
    </div>
  )
}

function Hero({ language }: { language: Language }) {
  return (
    <section
      id="top"
      className="relative flex min-h-[92svh] items-center overflow-hidden pt-28"
    >
      <div className="absolute inset-0 z-0">
        <img
          className="hero-image-motion h-full w-full object-cover"
          src={images.hero}
          alt={t(
            language,
            "Moderne bouwplaats met gewapend beton, staalstructuren en kranen",
          )}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#fcf9f8_0%,rgba(252,249,248,0.86)_31%,rgba(252,249,248,0.22)_71%,rgba(252,249,248,0)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1920px] grid-cols-1 gap-10 px-6 pb-20 md:px-12 lg:grid-cols-12">
        <div className="hero-copy lg:col-span-8">
          <p className="mb-6 text-sm font-bold uppercase tracking-section text-on-surface-variant">
            {t(language, "Building Engineering sinds 2009")}
          </p>
          <h1 className="max-w-xl text-5xl font-bold leading-[1.02] tracking-normal text-primary md:text-7xl lg:text-8xl">
            {t(language, "Solid Structure. Strong Partnership.")}
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-8 text-on-surface-variant md:text-2xl">
            {t(
              language,
              "Ruwbouwwerken voor grote en kleine investeringen. CONSTRUKTON bouwt aan voorspelbare uitvoering voor ontwikkelaars, hoofdaannemers en professionele investeerders.",
            )}
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg">
              <a href="#contact">
                {t(language, "Neem contact op")}
                <ArrowUpRight />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#portfolio">
                {t(language, "Bekijk projecten")}
                <ChevronRight />
              </a>
            </Button>
          </div>
        </div>

        <div className="hidden lg:col-span-4 lg:flex lg:items-end lg:justify-end">
          <div className="hero-stats grid w-full max-w-sm grid-cols-2 border border-primary/[.15] bg-background/[.72] backdrop-blur">
            {[
              ["15+", t(language, "jaar ervaring")],
              ["B2B", t(language, "bouwpartners")],
              ["4", t(language, "kernactiviteiten")],
              ["BE", t(language, "marktfocus")],
            ].map(([value, label]) => (
              <div key={label} className="border border-primary/10 p-6">
                <p className="text-3xl font-bold text-primary">{value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-on-surface-variant">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function SectionIntro({
  kicker,
  title,
  copy,
  align = "left",
}: {
  kicker: string
  title: string
  copy?: string
  align?: "left" | "center"
}) {
  return (
    <div className={cn(align === "center" && "text-center")} data-reveal>
      <span className="mb-4 block text-sm font-bold uppercase tracking-section text-on-surface-variant">
        {kicker}
      </span>
      <h2 className="text-4xl font-bold leading-tight tracking-normal text-primary md:text-6xl">
        {title}
      </h2>
      {copy ? (
        <p
          className={cn(
            "mt-6 max-w-2xl text-lg leading-8 text-on-surface-variant",
            align === "center" && "mx-auto",
          )}
        >
          {copy}
        </p>
      ) : null}
    </div>
  )
}

function WhyUs({ language }: { language: Language }) {
  return (
    <section className="bg-surface py-24 md:py-32" id="about">
      <div className="mx-auto max-w-[1920px] px-6 md:px-12">
        <div className="mb-20 flex items-end justify-between gap-8">
          <SectionIntro
            kicker={t(language, "Waarden")}
            title={t(language, "Waarom Construkton?")}
          />
          <div className="hidden max-w-sm border-l border-outline-variant pl-8 text-sm leading-7 text-on-surface-variant lg:block">
            {t(
              language,
              "Een compacte, technisch sterke partner voor ruwbouwprojecten waar timing, maatvoering en communicatie rechtstreeks impact hebben op rendement.",
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {values.map((item, index) => {
            const Icon = item.icon

            return (
              <article
                key={item.number}
                data-reveal
                style={revealDelay(index * 80)}
                className={cn(
                  "lift-card group flex min-h-96 flex-col justify-between p-10 md:p-12",
                  index % 2 === 0
                    ? "bg-surface-container-low hover:bg-surface-container"
                    : "motion-offset-lg bg-surface-container-highest",
                )}
              >
                <div className="flex items-start justify-between">
                  <span
                    className={cn(
                      "text-6xl font-bold italic leading-none",
                      index % 2 === 0
                        ? "text-primary-fixed-dim"
                        : "text-on-primary-container/30",
                    )}
                  >
                    {item.number}
                  </span>
                  <Icon className="size-8 text-primary/[.45] transition-colors group-hover:text-primary" />
                </div>
                <div>
                  <h3 className="mb-4 text-2xl font-bold text-primary">
                    {t(language, item.title)}
                  </h3>
                  <p className="leading-7 text-on-surface-variant">
                    {t(language, item.text)}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Services({ language }: { language: Language }) {
  return (
    <section
      className="relative overflow-hidden bg-surface-container-low py-24 md:py-32"
      id="services"
    >
      <div className="absolute right-0 top-0 hidden h-full w-1/3 -skew-x-12 bg-surface-container-highest/[.55] lg:block" />
      <div className="relative z-10 mx-auto grid max-w-[1920px] grid-cols-1 items-start gap-20 px-6 md:px-12 lg:grid-cols-2">
        <div>
          <SectionIntro
            kicker={t(language, "Competenties")}
            title={t(language, "Onze belangrijkste activiteiten")}
            copy={t(
              language,
              "Wij bieden volledige technische en uitvoerende ondersteuning in elke fase van de constructie van het gebouw.",
            )}
          />

          <div className="mt-14 space-y-5">
            {services.map((service, index) => {
              const Icon = service.icon

              return (
                <article
                  className="lift-card group grid grid-cols-[auto_1fr_auto] items-center gap-5 bg-surface-container-lowest p-5 shadow-hairline md:p-6"
                  key={service.title}
                  data-reveal
                  style={revealDelay(120 + index * 70)}
                >
                  <div className="flex size-14 items-center justify-center bg-primary-fixed text-primary">
                    <Icon className="size-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary">
                      {t(language, service.title)}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-on-surface-variant">
                      {t(language, service.detail)}
                    </p>
                  </div>
                  <ArrowUpRight className="hidden size-5 text-primary opacity-0 transition-opacity group-hover:opacity-100 sm:block" />
                </article>
              )
            })}
          </div>
        </div>

        <div className="relative pt-10 lg:pt-20" data-reveal style={revealDelay(180)}>
          <div className="absolute left-0 top-0 z-0 size-24 bg-primary-fixed lg:-left-10 lg:-top-10" />
          <div className="relative z-10 overflow-hidden">
            <img
              className="aspect-[3/4] w-full object-cover grayscale transition-all duration-700 hover:scale-[1.02] hover:grayscale-0"
              src={images.services}
              alt={t(
                language,
                "Interieur van een betonnen gebouw in aanbouw met daglicht door structurele openingen",
              )}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function Portfolio({ language }: { language: Language }) {
  const projectGroupSize = 5
  const totalProjectGroups = Math.ceil(projects.length / projectGroupSize)
  const [projectGroup, setProjectGroup] = useState(0)
  const [isProjectRotationPaused, setIsProjectRotationPaused] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const activeProjects = Array.from(
    { length: projectGroupSize },
    (_, index) =>
      projects[(projectGroup * projectGroupSize + index) % projects.length],
  )

  useEffect(() => {
    if (isProjectRotationPaused || selectedProject) return

    const interval = window.setInterval(() => {
      setProjectGroup((current) => (current + 1) % totalProjectGroups)
    }, 5000)

    return () => window.clearInterval(interval)
  }, [isProjectRotationPaused, selectedProject, totalProjectGroups])

  return (
    <section className="bg-surface py-24 md:py-32" id="portfolio">
      <div className="mx-auto max-w-[1920px] px-6 md:px-12">
        <div className="mb-20 flex items-end justify-between gap-8">
          <SectionIntro
            kicker={t(language, "Realisaties")}
            title={t(language, "Geselecteerde projecten")}
          />
          <Button asChild variant="link" className="hidden md:inline-flex">
            <a href="#contact">
              {t(language, "Bespreek uw project")}
              <ArrowUpRight />
            </a>
          </Button>
        </div>

        <div
          key={projectGroup}
          className="project-cycle grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5"
          onMouseEnter={() => setIsProjectRotationPaused(true)}
          onMouseLeave={() => setIsProjectRotationPaused(false)}
          onFocus={() => setIsProjectRotationPaused(true)}
          onBlur={() => setIsProjectRotationPaused(false)}
        >
          {activeProjects.map((project) => (
            <ProjectCard
              key={project.title}
              language={language}
              project={project}
              onSelect={() => setSelectedProject(project)}
            />
          ))}
        </div>

        <div className="mt-10 flex items-center justify-between gap-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-on-surface-variant">
            {String(projectGroup + 1).padStart(2, "0")} /{" "}
            {String(totalProjectGroups).padStart(2, "0")}
          </p>
          <div className="flex flex-1 justify-end gap-3">
            {Array.from({ length: totalProjectGroups }, (_, index) => (
              <button
                key={index}
                type="button"
                className={cn(
                  "h-1.5 w-12 bg-outline-variant transition-all duration-300 hover:bg-primary",
                  index === projectGroup && "w-20 bg-primary",
                )}
                aria-label={`${t(language, "Toon projectgroep")} ${index + 1}`}
                aria-current={index === projectGroup ? "true" : undefined}
                onClick={() => setProjectGroup(index)}
              />
            ))}
          </div>
        </div>
      </div>

      <ProjectGalleryModal
        language={language}
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  )
}

function ProjectCard({
  language,
  project,
  className,
  onSelect,
}: {
  language: Language
  project: Project
  className?: string
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      className={cn(
        "lift-card group relative block overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4",
        className,
      )}
      onClick={onSelect}
      aria-label={`${t(language, "Bekijk foto's")} - ${project.title}`}
    >
      <img
        className="h-[22rem] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        src={project.image}
        alt={t(language, project.alt)}
        loading={project.featured ? "eager" : "lazy"}
      />
      <div className="absolute inset-0 flex items-end bg-primary/0 p-5 transition-colors duration-300 group-hover:bg-primary/[.34]">
        <div className="w-full bg-primary/[.88] px-5 py-4 text-white backdrop-blur-sm transition-transform duration-300 group-hover:-translate-y-1">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-fixed-dim">
            {t(language, "Bekijk foto's")}
          </p>
          <h3 className="text-xl font-bold leading-tight">{project.title}</h3>
          <p className="mt-2 text-xs uppercase tracking-[0.16em] text-surface-variant">
            {t(language, project.meta)}
          </p>
        </div>
      </div>
    </button>
  )
}

function ProjectGalleryModal({
  language,
  project,
  onClose,
}: {
  language: Language
  project: Project | null
  onClose: () => void
}) {
  const [currentImage, setCurrentImage] = useState(0)
  const galleryImages = project?.gallery.length ? project.gallery : []

  useEffect(() => {
    setCurrentImage(0)
  }, [project?.slug])

  useEffect(() => {
    if (!project) return

    project.gallery.forEach((source) => {
      const image = new Image()
      image.src = source
    })
  }, [project])

  useEffect(() => {
    if (!project) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose()
      }
      if (event.key === "ArrowRight") {
        setCurrentImage((image) => (image + 1) % galleryImages.length)
      }
      if (event.key === "ArrowLeft") {
        setCurrentImage(
          (image) => (image - 1 + galleryImages.length) % galleryImages.length,
        )
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [galleryImages.length, onClose, project])

  if (!project) return null
  const activeProject = project

  function useFallbackImage(event: SyntheticEvent<HTMLImageElement>) {
    if (event.currentTarget.dataset.fallback === "true") return

    event.currentTarget.dataset.fallback = "true"
    event.currentTarget.src = activeProject.image
  }

  function resetFallbackState(event: SyntheticEvent<HTMLImageElement>) {
    delete event.currentTarget.dataset.fallback
  }

  function showPreviousImage() {
    setCurrentImage(
      (image) => (image - 1 + galleryImages.length) % galleryImages.length,
    )
  }

  function showNextImage() {
    setCurrentImage((image) => (image + 1) % galleryImages.length)
  }

  return (
    <div
      className="gallery-modal-backdrop fixed inset-0 z-[80] flex items-center justify-center bg-primary/75 px-4 py-6 backdrop-blur-md md:px-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${t(language, "Projectgalerij")} ${project.title}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <div className="gallery-modal-panel relative grid max-h-[92vh] w-full max-w-6xl grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden bg-background shadow-architectural">
        <div className="relative overflow-hidden border-b border-outline-variant bg-surface-container-low p-5 md:p-7">
          <div className="relative z-10 flex items-start justify-between gap-8">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-on-surface-variant">
                {t(language, "Projectgalerij")}
              </p>
              <h3 className="text-3xl font-bold leading-tight text-primary md:text-5xl">
                {project.title}
              </h3>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold uppercase tracking-[0.18em] text-on-surface-variant">
                <span>{t(language, project.meta)}</span>
              </div>
            </div>
            <button
              type="button"
              className="flex size-11 shrink-0 items-center justify-center text-primary transition-opacity hover:opacity-60"
              aria-label={t(language, "Galerij sluiten")}
              onClick={onClose}
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        <div className="relative min-h-0 bg-background p-5 md:p-7">
          <figure
            className="relative h-full min-h-[24rem] overflow-hidden bg-surface-container-low bg-cover bg-center shadow-hairline"
            style={{ backgroundImage: `url(${activeProject.image})` }}
          >
            <img
              className="h-full max-h-[62vh] min-h-[24rem] w-full object-cover"
              src={galleryImages[currentImage]}
              alt={`${project.title} - ${t(language, "Toon foto")} ${currentImage + 1}`}
              decoding="async"
              loading="eager"
              onError={useFallbackImage}
              onLoad={resetFallbackState}
            />

            <button
              type="button"
              className="absolute left-4 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center bg-background/85 text-primary backdrop-blur transition-colors hover:bg-background"
              aria-label={t(language, "Vorige foto")}
              onClick={showPreviousImage}
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              className="absolute right-4 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center bg-background/85 text-primary backdrop-blur transition-colors hover:bg-background"
              aria-label={t(language, "Volgende foto")}
              onClick={showNextImage}
            >
              <ChevronRight className="size-5" />
            </button>
          </figure>
        </div>

        <div className="flex items-center justify-center gap-3 border-t border-outline-variant bg-surface-container-low px-5 py-4">
          {galleryImages.map((image, index) => (
            <button
              key={image}
              type="button"
              className={cn(
                "h-1.5 w-10 bg-outline-variant transition-all duration-300 hover:bg-primary",
                index === currentImage && "w-16 bg-primary",
              )}
              aria-label={`${t(language, "Toon foto")} ${index + 1}`}
              aria-current={index === currentImage ? "true" : undefined}
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function Testimonials({ language }: { language: Language }) {
  return (
    <section
      className="bg-surface-container-low py-24 md:py-32"
      id="testimonials"
    >
      <div className="mx-auto max-w-[1920px] px-6 md:px-12">
        <SectionIntro
          kicker={t(language, "Referenties")}
          title={t(language, "Wat zakelijke partners waarderen")}
          align="center"
        />

        <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
          {testimonials.map((testimonial, index) => (
            <article
              className={cn("relative", index === 1 && "lg:mt-12")}
              key={testimonial.name}
              data-reveal
              style={revealDelay(index * 100)}
            >
              <span
                className="absolute -left-4 -top-14 text-8xl font-bold leading-none text-primary-fixed-dim/[.55]"
                aria-hidden="true"
              >
                "
              </span>
              <p className="relative z-10 mb-8 text-xl italic leading-9 text-on-surface">
                {t(language, testimonial.quote)}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex size-12 items-center justify-center bg-primary-container text-sm font-bold text-primary-fixed-dim">
                  {testimonial.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </div>
                <div>
                  <p className="font-bold text-primary">{testimonial.name}</p>
                  <p className="text-xs uppercase tracking-[0.16em] text-on-surface-variant">
                    {t(language, testimonial.role)}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact({
  language,
  onSubmit,
  formState,
}: {
  language: Language
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  formState: "idle" | "sent"
}) {
  return (
    <section className="bg-surface py-24 md:py-32" id="contact">
      <div className="mx-auto grid max-w-[1920px] grid-cols-1 gap-20 px-6 md:px-12 lg:grid-cols-2 lg:gap-32">
        <div>
          <SectionIntro
            kicker={t(language, "Contact")}
            title={t(language, "Laten we praten over uw project")}
            copy={t(
              language,
              "Ons technisch bureau staat klaar om een eerste prijsopgave op te stellen op basis van de ingediende documentatie.",
            )}
          />

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
            <ContactLine
              icon={MapPin}
              label={t(language, "Kantooradres")}
              value={t(language, "Architectenlaan 12, 1000 Brussel")}
            />
            <ContactLine
              icon={Mail}
              label={t(language, "E-mail")}
              value="projecten@construkton.be"
            />
            <ContactLine
              icon={Phone}
              label={t(language, "Telefonisch")}
              value="+32 2 340 18 90"
            />
          </div>
        </div>

        <form
          className="lift-card relative bg-surface-container-low p-8 shadow-hairline md:p-12"
          onSubmit={onSubmit}
          data-reveal
          style={revealDelay(120)}
        >
          <div className="absolute -bottom-4 -right-4 size-16 bg-primary-fixed" />
          <div className="space-y-10">
            <FieldLabel label={t(language, "Naam / Bedrijf")}>
              <Input
                name="name"
                placeholder={t(language, "Jan Peeters")}
                autoComplete="name"
                required
              />
            </FieldLabel>
            <FieldLabel label={t(language, "Zakelijk e-mailadres")}>
              <Input
                name="email"
                placeholder={t(language, "naam@bedrijf.be")}
                type="email"
                autoComplete="email"
                required
              />
            </FieldLabel>
            <FieldLabel label={t(language, "Bericht / Omvang van de werken")}>
              <Textarea
                name="message"
                placeholder={t(
                  language,
                  "Beschrijf kort de parameters van de investering...",
                )}
                required
              />
            </FieldLabel>

            {formState === "sent" ? (
              <div className="border border-primary/20 bg-surface-container-lowest p-4 text-sm font-bold text-primary">
                {t(language, "Bedankt. Uw aanvraag is genoteerd voor opvolging.")}
              </div>
            ) : null}

            <Button className="w-full" size="lg" type="submit">
              {t(language, "Aanvraag verzenden")}
              <Send />
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}

function ContactLine({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: string
}) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-4">
      <div className="flex size-11 items-center justify-center bg-primary-fixed text-primary">
        <Icon className="size-5" />
      </div>
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-section text-on-surface-variant">
          {label}
        </p>
        <p className="text-xl font-bold leading-7 text-primary">{value}</p>
      </div>
    </div>
  )
}

function FieldLabel({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-on-surface-variant">
        {label}
      </span>
      {children}
    </label>
  )
}

function Footer({ language }: { language: Language }) {
  const links = [
    "Privacybeleid",
    "Samenwerkingsvoorwaarden",
    "Carrière",
    "Persbureau",
  ]

  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto flex max-w-[1920px] flex-col justify-between gap-10 px-6 py-14 md:flex-row md:items-center md:px-12">
        <div>
          <a
            className="mb-2 block text-2xl font-bold tracking-normal text-white"
            href="#top"
          >
            CONSTRUKTON
          </a>
          <p className="text-xs uppercase tracking-[0.16em] text-outline-variant">
            {t(language, "© 2026 CONSTRUKTON. Alle rechten voorbehouden.")}
          </p>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-4">
          {links.map((link) => (
            <a
              className="text-xs uppercase tracking-[0.16em] text-outline-variant transition-colors hover:text-white"
              href="#top"
              key={link}
            >
              {t(language, link)}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default App
