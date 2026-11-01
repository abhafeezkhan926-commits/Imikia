import type {Product} from './data';
// Public product image filenames and their original category paths, inspected on imikia.com.
const groups=[
['new-arrvial-ride-on/top-latest-new-arrival-ride-on',`24v-ride-on-car-with-brushless-motors28271061328.jpg
licensed-bmw-6-gt-ride-on-cars23081166912.jpg
kids-electric-licensed-car-ride-on34292967817.jpg
licensed-bentley-12v-ride-on-children49486539145.jpg`],
['new-arrvial-ride-on/latest-new-arrival-ride-on',`licensed-bmw-two-seater-childrens-ride-on-car58267470208.jpg
electric-car-for-children-12v-pick-up05231050392.jpg
licensed-mercedes-benz-amg-g63-12v-kids-ride19493289981.jpg
maserati-levante-12v-kids-ride-on-car38404710163.jpg
licensed-mercedes-benz-amg-gt4-12v-ride-on38206271453.jpg
12v-kids-fire-engine-truck-ride-on-toy42282224765.jpg`],
['licensed-battery-powered-ride-on/mercedes-ride-on-car',`mercedes-sls-12v-kids-ride-on-car44371220670.jpg
mercedes-benz-cla45-ride-on-toy-car22582659883.jpg`],
['licensed-battery-powered-ride-on/licensed-bmw-i8-series',`licensed-bmw-i8-12v-ride-on-car-with-remote49101256203.jpg
licensed-bmw-z8-kids-electric-ride-on-car50262282666.jpg`],
['licensed-battery-powered-ride-on/children-s-audi-ride-on',`licensed-audi-q7-12v-ride-on-kids-car03271296960.jpg
audi-q5-12v-electric-kids-ride-on-toy-car04221688426.jpg`],
['licensed-battery-powered-ride-on/electric-ride-on-jaguar',`licensed-jaguar-f-type-svr-convertible05279552791.jpg
licensed-jaguar-f-type-12v-childrens-ride-on10271022021.jpg`],
['licensed-battery-powered-ride-on/maserati-children-s-ride-on-car',`maserati-grancabrio-12v-electric-kids-ride-on15498453006.jpg
maserati-alfieri-licensed-car-for-kids-12v24262654362.jpg`],
['licensed-battery-powered-ride-on/remote-control-ride-on',`2-seater-volkswagen-amarok-pick-up-ride-on23038494834.jpg
electric-ride-on-toy-car-volkswagen-amarok24297407036.jpg`],
['battery-operated-ride-on/aged-1-and-3-years-ride-on',`amg-6x6-children-electric-ride-on-convertible33283443196.jpg
mercedes-gl63-kids-convertible-foot-to-floor36254746408.jpg
pagani-kids-convertible-ride-on-push-car37443837113.jpg`],
['battery-operated-ride-on/aged-3-and-8-years-ride-on',`rocket-drifter-4x4-12v-electric-ride-on-jeep25293966944.jpg
kids-ride-on-cars-12v-electric-with-2-speed45199431797.jpg
kids-hummer-h2-two-seater-12volt-ride-on48217785932.jpg
ferrari-style-kids-battery-operated-electric51325249933.jpg
electric-ride-on-toy-car-buggy-2x12-volts54190051364.jpg`],
['battery-operated-ride-on/aged-8-and-12-years-ride-on',`12v-childrens-ride-on-toys04141232412.jpg
kids-ride-on-jeep-style-battery-powered05547888280.jpg
quad-bike-for-kids-electric-ride-on-cars07163049749.jpg
licensed-toyota-hilux-24v-ride-on-pickup08487602104.jpg`],
['ride-on-motorcycles/licensed-motorcycles-ride-on',`ride-on-24v-big-kids-atv-quad-bike17338042453.jpg
bmw-12v-kids-electric-ride-on-bike-motorbike22145570129.jpg
kids-ride-on-motorcycle-bmw-licensed-6v24202136875.jpg
vespa-licensed-px150-12v-kids-motorbike26339795556.jpg`],
['ride-on-motorcycles/non-licensed-motorbike-ride-on',`kids-motocross-electric-tricycle-ride-on34267301660.jpg
ktm-duke-style-ride-on-motorbike-trike35429190031.jpg
3-wheel-harley-style-6v-battery-powered37076190194.jpg
street-racer-12v-electric-kids-ride-on38222241612.jpg`],
['pedal-go-kart/licensed-pedal-go-karts',`kids-official-licensed-abarth-pedal-go-kart26302616820.jpg
licensed-defender-go-karts-ride-on42451562780.jpg`],
['pedal-go-kart/mini-go-karts',`pedal-cars-go-kart42202319786.jpg
pedal-car-pedal-powered-ride-on-toys44139766847.jpg
go-kart-4-wheel-pedal-powered-ride-on47286658365.jpg
pedal-powered-go-kart-ride-on-car49251949460.jpg
pedal-go-kart-kids-children-with-hand-brake51019994257.jpg
pedal-kart-racing23084712319.jpg`],
['pedal-go-kart/non-licensed-pedal-go-karts',`go-kart-kids-racing-toy-rubber-tyres-wheels52381711643.jpg
batman-style-rubber-wheel-go-kart27190460868.jpg
green-outdoor-gokart-kids-pedal-gocart05474209503.jpg
large-old-kids-with-foot-pedal-and-brake07407690632.jpg
racer-go-kart28146127421.jpg`]
];
const title=(s:string)=>s.replaceAll('-',' ').replace(/\b\w/g,c=>c.toUpperCase()).replace(/\bBmw\b/g,'BMW').replace(/\bAmg\b/g,'AMG');
export const migratedCatalogue:Product[]=groups.flatMap(([path,files])=>files.split('\n').map(file=>{const slug=file.replace(/\d+\.jpg$/,'');return {slug,name:title(slug),category:path.split('/')[0],subcategory:path.split('/')[1],sourcePath:'/'+path+'/'+slug+'.html',image:'http://www.imikia.com/uploads/201920061/'+file,description:'Imported from the original IMIKIA catalogue. Request the current technical sheet, available options and wholesale quotation for this model.',specs:{'Catalogue status':'Specifications require confirmation'},featured:false}}));
export const migratedSubcategories=groups.map(([path])=>({slug:path.split('/')[1],name:title(path.split('/')[1]),description:'',parent:path.split('/')[0]}));
