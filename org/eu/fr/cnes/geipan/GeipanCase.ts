import { GeipanCaseClassification, GeipanCaseClassification_minus } from "./GeipanCaseClassification"

export enum GeipanZoneType {
  Aerial = "(A) Aérien",
  Department = "(D) Département",
  National = "(N) National",
  Region = "(R) Région"
}

export type GeipanCase = {
  /**
   * 108
   */
  id_cas: number

  /**
   * "NANTES (44) 08.10.1969"
   */
  cas_nom_dossier: string

  /**
   * "Loire-Atlantique"
   */
  cas_zone_nom: string

  /**
   * ("44", "972", "MA.01", "SN.DK" for instance)
   */
  cas_zone_code: string

  cas_zone_type?: GeipanZoneType

  /**
   * Sighting year
   */
  cas_AAAA: string

  /**
   * Sighting month ("02" for instance)
   */
  cas_MM: string

  /**
   * Sighting day of month ("06" for instance)
   */
  cas_JJ: string

  /**
   * Sighting description
   * Par ex : "Les 18,19 et 20 mars 1977 plusieurs personnes dont des gendarmes observent à partir de 20h30 la présence
   * d'une étrange lueur dans le ciel.
   * Celle-ci se déplace lentement et semble par moment grossir ou diminuer. La couleur peut varier du blanc au jaune orangé.
   * La lueur disparaît vers 21h. L'hypothèse d'une observation astronomique n'a pu être confirmée par manque d'informations."
   */
  cas_resume: string

  /**
   * Sighting summary ("Observations périodiques d'une lueur, Déplacement lent.")
   */
  cas_resume_web: string

  /**
   * Allowed for public display.
   */
  cas_public: boolean

  /**
   * Testimonials count (2 or undefined for instance)
   */
  cas_temoignages_nb?: number

  /**
   * Witnesses count (2 or undefined for instance)
   */
  cas_temoins_nb?: number

  /**
   * Approximated count of witnesses.
   */
  cas_temoins_nb_approx?: number

  /**
   * UFOs count.
   */
  cas_nb_PAN?: number

  /**
   * Approximate UFOs count.
   */
  cas_nb_PAN_approx?: number

  /**
   *
   */
  cas_MinCercleInscrit_Lat?: any

  /**
   *
   */
  cas_MinCercleInscrit_Lng?: any

  /**
   *
   */
  cas_MinCercleInscrit_Err?: any

  /**
   * Update ("2015-12-07" for instance)
   */
  cas_date_maj: string

  /**
   * Strangeness index (0.25 for instance)
   */
  cas_etrangete?: number

  /**
   *
   */
  cas_etrangete_err?: number

  /**
   * Computed strangeness index (0.38 for instance)
   */
  cas_etrangete_calc: number

  /**
   * (0.13 for instance)
   */
  cas_etrangete_calc_err: number

  /**
   * Case reliability (0.80 for instance)
   */
  cas_fiabilite?: number

  /**
   *
   */
  cas_fiabilite_err?: any

  /**
   * Computed case reliability (0.70 for instance)
   */
  cas_fiabilite_calc?: number

  /**
   * Data amount index
   */
  cas_qte_information?: number

  /**
   * Computed data amount index
   */
  cas_qte_information_calc?: number

  /**
   * Case consistency (0.56 for instance)
   */
  cas_consistance?: number

  /**
   * Computed case consistency (0.56 for instance)
   */
  cas_consistance_calc: number

  /**
   * 0.00
   */
  cas_consistance_calc_err: number

  cas_classification: GeipanCaseClassification

  /**
   *
   */
  cas_classification_calc?: GeipanCaseClassification & GeipanCaseClassification_minus

  /**
   * ("2018-02-50473" for instance)
   */
  cas_numEtude: string
}
