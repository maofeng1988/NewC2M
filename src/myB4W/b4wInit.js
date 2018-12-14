import b4w from "blend4web";

const m_app       = b4w.app;
const m_data      = b4w.data;
const m_anim      = b4w.animation; //not default
const m_cont      = b4w.container; //not default
const m_mouse     = b4w.mouse; //not default
const m_scenes    = b4w.scenes; //not default
const m_cfg       = b4w.config;
const m_tex       = b4w.textures;
const m_mat       = b4w.material;

let m_id        = null;
// let m_id2       = null;

let _previous_selected_obj = null; //not default

const APP_ASSETS_PATH = "assets/";


let ALREADY_RUNNING = false;


export const init_app = () => {
    // if (detect_mobile()){
    //     cfg_def.msaa_samples = 1;
    // }
   if (!ALREADY_RUNNING) {
        ALREADY_RUNNING = true;  
        // m_cfg.apply_quality(m_cfg.P_ULTRA);  
        m_cfg.msaa_samples = 1;
        m_app.init({
            // alpha: true,
            // background_color: [0.5, 0.5, 0.5, 1],
            canvas_container_id: "b4w",
            callback: init_cb,
            autoresize: true,
            pause_invisible:true,
            reflections: true,
            // reflection_quality:m_cfg.P_HIGH,
            quality: m_cfg.P_CUSTOM,
            msaa_samples: 1,
            shadows:true,

 
        });
    } else {
        m_data.unload();
        // m_cfg.apply_quality(m_cfg.P_ULTRA); 
        m_cfg.msaa_samples = 1;
        m_app.init({
            canvas_container_id: "b4w",
            callback: init_cb,
            autoresize: true,
            reflections: true,
            // reflections_quality:"HIGH",
            quality: m_cfg.P_CUSTOM,
            msaa_samples: 1,
            shadows:true,

        })
    }
};

const init_cb = (canvas_elem, success) => {

    if (!success) {
        console.log("b4w init failure");
        return;
    }

     // ignore right-click on the canvas element
    canvas_elem.oncontextmenu = function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    };

    load();
}

const load = () => {
    let preloader_cont = document.getElementById("preloader_cont");
    preloader_cont.style.visibility = "visible";
    // m_data.load(APP_ASSETS_PATH + "yurongfu_sence.json", load_cb, null); //point this at your .json
    m_data.load(APP_ASSETS_PATH + "yurongfu_newscene.json", load_cb, null);
    // m_id = m_data.load(APP_ASSETS_PATH + "yurongfu_mesh.json", () => {
    //     console.log("😁😁😁😁😁show😁😁😁😁😁");
    // }, preloader_cb);
    m_id = m_data.load(APP_ASSETS_PATH + "yurongfu_new.json", () => {
        console.log("😁😁😁😁😁show😁😁😁😁😁");
    }, preloader_cb);
    // m_id2 = m_data.load(APP_ASSETS_PATH + "box.json", () => {
    //     console.log("😁😁😁😁😁show😁😁😁😁😁");
    // }, preloader_cb);
    // m_data.load(APP_ASSETS_PATH + "yurongfu.json", null, null); //point this at your .json
}

const preloader_cb = (percentage) => {
    let prelod_dynamic_path = document.getElementById("prelod_dynamic_path");
    let logo_cont = document.getElementById("logo_container");
    //let percentage_num      = prelod_dynamic_path.nextElementSibling;
  
    prelod_dynamic_path.style.width = percentage + "%";
    if (percentage === 100) {
        let preloader_cont = document.getElementById("preloader_cont");
        preloader_cont.style.visibility = "hidden";
        logo_cont.style.visibility = "hidden";
        return;
    }
}

const load_cb = (data_id, success) => {

    if (!success) {
        console.log("b4w load failure");
        return;
    }

    m_app.enable_camera_controls();  //not default

    // place your code here
    var canvas_elem = m_cont.get_canvas(); //not default
    canvas_elem.addEventListener("mousedown", main_canvas_click, false); //not default
    canvas_elem.addEventListener("touchstart", main_canvas_click, false); //not default

}

export const changeVisiable = (name, show) => {
    const cube1 = m_scenes.get_object_by_name(name, m_id);
    debugger
    const show1 = m_scenes.is_visible(cube1);
    console.log("😁😁😁😁😁hidden😁😁😁😁😁", cube1,  show1);
    show ? m_scenes.hide_object(cube1) : m_scenes.show_object(cube1);
}
export const hideObjects = (arr) => {
    console.log("22222222222222222222");  
    if(arr){
        for(var i=0; i<arr.length; i++){
            debugger
            const cube = m_scenes.get_object_by_name(arr[i], m_id);
            m_scenes.hide_object(cube);
          }   
    }
    
}

// export const changeTexture= (obj, name, path) => {
//     const target=m_scenes.get_object_by_name(obj);
//     m_tex.change_image(target, name, path);
// }
export const changeTexture= (name, text_name, path) => {
    console.log("111111111");
    debugger
    const cube1 = m_scenes.get_object_by_name(name, m_id);
    // const cube2 = m_scenes.get_object_by_name("Pattern2D_315009.005", m_id);
    debugger
    const image = new Image();
    // const image2 = new Image();
    image.onload = function(){
        m_tex.replace_image(cube1,text_name,image);
        // m_tex.replace_image(cube2,"Texture.001",image2);
    }
    // image.src = APP_ASSETS_PATH+"mianliao02.jpg";
    // image2.src = APP_ASSETS_PATH+"mianliao01.jpg";
    image.src = path;
}
export const changeEmbColor=(name,name_list,dest)=> {
    debugger
    const cube = m_scenes.get_object_by_name(name, m_id);
    // const has_nodes = m_mat.is_node_material(cube, "ds");
    // var embColor = m_mat.get_nodemat_rgb(cube, name_list,dest);
    m_mat.set_nodemat_rgb(cube, name_list, dest[0], dest[1], dest[2]);
}

const main_canvas_click = (e) => {
    if (e.preventDefault)
        e.preventDefault();

    var x = m_mouse.get_coords_x(e);
    var y = m_mouse.get_coords_y(e);

    var obj = m_scenes.pick_object(x, y);

    if (obj) {
        if (_previous_selected_obj) {
            m_anim.stop(_previous_selected_obj);
            m_anim.set_frame(_previous_selected_obj, 0);
        }
        _previous_selected_obj = obj;

        m_anim.apply_def(obj);
        m_anim.play(obj);
    }
}

