import {Rr0Module} from "./rr0"
import {CommonModule} from "./common"
import {NavModule} from "./nav/nav"
import {LangModule} from "./lang"
import {NetModule} from "./net"
import {PlaceModule} from "../place/place"
import {FootModule} from "./note/foot"
import {ContextModule} from "./rr0-context"
import {ScienceModule} from "../science/science"
import {TimeModule} from "../time/time"
import {PeopleModule} from "../people/people"

const common = new CommonModule()
const net = new NetModule(common)
const lang = new LangModule(common, net)
const root = document
const nav = new NavModule(common, lang, root)
const place = new PlaceModule()
const foot = new FootModule(common, root)
const context = new ContextModule(common)
const science = new ScienceModule()
const people = new PeopleModule(nav, common)
const time = new TimeModule(common, lang, nav, net, people)
const rr0 = new Rr0Module(common, nav, place, foot, context, science, time, people, foot)
export default rr0
