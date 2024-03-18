import { TimeContext } from "../../TimeContext"
import { rr0TestUtil } from "../../../test/RR0TestUtil"
import { rr0Datasource } from "./RR0Mapping"
import { NamedPlace, RR0CaseSummary } from "./RR0CaseSummary"
import { UrlUtil } from "../../../util/url/UrlUtil"
import { Source } from "../../../source/Source"

function testCase(urlPath: string, time: TimeContext, description: string, sources: Source[],
                  place?: NamedPlace): RR0CaseSummary {
  const path = UrlUtil.join(rr0Datasource.searchPath, urlPath)
  const url = new URL(path, rr0Datasource.baseUrl)
  return {url, place, time, description, sources}
}

export const rr0TestCases: RR0CaseSummary[] = [
  testCase("1/9/7/0/03/index.html", new TimeContext(rr0TestUtil.intlOptions, 1970, 3),
    "L'armée de l'Air indique : Le BPE (Bureau Prospective et Etudes) s'assure qu'aucun des témoignages qui lui sont transmis, soit par les régions aériennes ou militaires, soit par la gendarmerie nationale, ne contienne des informations pouvant intéresser l'armée de l'air ou la mettre en cause. Transmet ces documents à monsieur Claude Poher, ingénieur du Cnes, habilité \"Secret Défense\", qui a été désigné par cet organisme pour suivre officiellement cette question. Reçoit du GEPA toutes les informations sur les ovnis dans le monde. Exploite les conclusions des travaux que Monsieur Poher transmet périodiquement au BPE et qui ont permis, entre autres, d'établir la fiche pour le ministre l'année dernière.",
    [{
      id: "s4",
      authors: ["Velasco, Jean-Jacques"],
      publication: {publisher: "", time: new TimeContext(rr0TestUtil.intlOptions, 2004)}
    }]),
  testCase("1/9/7/0/03/index.html#1970-03-04", new TimeContext(rr0TestUtil.intlOptions, 1970, 3, 4),
    "Disparition du sous-marin français Eurydice au large de Saint-Tropez, avec 50 hommes à bord. Ce bâtiment était conçu pour la lutte contre les sous-marins à propulsion nucléaire et ne lança pas le moindre appel, alors qu'il était en parfait état de marche.",
    []),
  testCase("1/9/7/0/03/index.html#1970-03-07", new TimeContext(rr0TestUtil.intlOptions, 1970, 3, 7),
    "Le satellite ATS 3 prend la photo d'une éclipse totale qui montre l'ombre de la Lune sur les USA. Ce rond sombre de 160 km de diamètre se déplace du sud-ouest au nord à la vitesse de 2400 km/h.",
    []),
  testCase("1/9/7/0/03/index.html#1970-03-28%2023:00", new TimeContext(rr0TestUtil.intlOptions, 1970, 3, 28, 23, 0),
    "canular de David I. Simpson visant à tester les ufologues. Le photographe dupera Charles Bowen qui, ayant une confiance aveugle en ce dernier, incitera également Pierre Guérin à valider à tort les 4 photos. La supercherie ne sera révélée qu'en mars 1976.",
    [
      {
        title: "FSR",
        id: "s1",
        authors: ["Guérin, P."],
        publication: {
          publisher: `vol. 16, n° 6, p.7-8.`,
          time: undefined
        }
      },
      {
        title: "Revue du MUFOB",
        id: "s2",
        authors: ["Simpson, D. I."],
        publication: {
          publisher: "nouvelle série, n° 2",
          time: new TimeContext(rr0TestUtil.intlOptions, 1976, 3)
        }
      },
      {
        title: `"Quand les 'rationalistes' fabriquent de fausses photos d'ovnis" in Ovni : les mécanismes d'une désinformation`,
        id: "s3",
        authors: ["Guérin, P."],
        publication: {
          publisher: "Albin Michel, p. x-y",
          time: undefined
        }
      }
    ],
    {name: "Warminster", place: {locations: []}}
  )
]
