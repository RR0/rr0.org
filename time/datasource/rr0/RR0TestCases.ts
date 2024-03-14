import { TimeContext } from "../../TimeContext"
import { rr0TestUtil } from "../../../test/RR0TestUtil"
import { rr0Datasource } from "./RR0Mapping"
import { RR0CaseSummary } from "./RR0CaseSummary"
import { UrlUtil } from "../../../util/url/UrlUtil"

export const rr0TestCases: RR0CaseSummary[] = [
  {
    url: new URL(UrlUtil.join(rr0Datasource.searchPath, "1/9/7/0/03/index.html"), rr0Datasource.baseUrl),
    time: new TimeContext(rr0TestUtil.intlOptions, 1970, 3),
    description: "L'armée de l'Air indique : Le BPE (Bureau Prospective et Etudes) s'assure qu'aucun des témoignages qui lui sont transmis, soit par les régions aériennes ou militaires, soit par la gendarmerie nationale, ne contienne des informations pouvant intéresser l'armée de l'air ou la mettre en cause. Transmet ces documents à monsieur Claude Poher, ingénieur du Cnes, habilité \"Secret Défense\", qui a été désigné par cet organisme pour suivre officiellement cette question. Reçoit du GEPA toutes les informations sur les ovnis dans le monde. Exploite les conclusions des travaux que Monsieur Poher transmet périodiquement au BPE et qui ont permis, entre autres, d'établir la fiche pour le ministre l'année dernière.",
    sources: [{title: "Velasco, Jean-Jacques: 2004"}]
  },
  {
    url: new URL(UrlUtil.join(rr0Datasource.searchPath, "1/9/7/0/03/index.html#1970-03-04"), rr0Datasource.baseUrl),
    time: new TimeContext(rr0TestUtil.intlOptions, 1970, 3, 4),
    description: "Disparition du sous-marin français Eurydice au large de Saint-Tropez, avec 50 hommes à bord. Ce bâtiment était conçu pour la lutte contre les sous-marins à propulsion nucléaire et ne lança pas le moindre appel, alors qu'il était en parfait état de marche.",
    sources: []
  },
  {
    url: new URL(UrlUtil.join(rr0Datasource.searchPath, "1/9/7/0/03/index.html#1970-03-07"), rr0Datasource.baseUrl),
    time: new TimeContext(rr0TestUtil.intlOptions, 1970, 3, 7),
    description: "Le satellite ATS 3 prend la photo d'une éclipse totale qui montre l'ombre de la Lune sur les USA. Ce rond sombre de 160 km de diamètre se déplace du sud-ouest au nord à la vitesse de 2400 km/h.",
    sources: []
  },
  {
    url: new URL(UrlUtil.join(rr0Datasource.searchPath, "1/9/7/0/03/index.html#1970-03-28%2023:00"),
      rr0Datasource.baseUrl),
    place: {
      name: "Warminster",
      place: {}
    },
    time: new TimeContext(rr0TestUtil.intlOptions, 1970, 3, 28, 23, 0),
    description: "canular de David I. Simpson visant à tester les ufologues. Le photographe dupera Charles Bowen qui, ayant une confiance aveugle en ce dernier, incitera également Pierre Guérin à valider à tort les 4 photos. La supercherie ne sera révélée qu'en mars 1976.",
    sources: [
      {title: "Guérin, P.: FSR, vol. 16,n° 6, p.7-8."},
      {title: "Simpson, D. I.: Revue du MUFOB, nouvelle série, n° 2, 1976-03"},
      {title: "Guérin, P.: \"Quand les 'rationalistes' fabriquent de fausses photos d'ovnis\" in Ovni : les mécanismes d'une désinformation, Albin Michel, p. x-y"}
    ]
  }
]
