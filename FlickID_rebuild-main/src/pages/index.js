"use client"; 
import $ from "jquery"
import { useEffect } from "react";
import { faCircleHalfStroke, faTableCells } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {FaDesktop, FaUser, FaUpload, FaSave, FaBars, FaArrowLeft, FaImages, FaMobile, FaTablet, FaTimes, FaPlus} from "react-icons/fa";

export default function Home() {  
  
  function openAddModal(){
    $('#addMdl').show();
  }

  function openModal(val) {    
    document.querySelector("#hndIsMdl").value = "1";     
    var close = document.getElementById("btnCloseMdl");
    close.addEventListener("click", () => closeStack());  
    const parentDiv = document.getElementById("parent-100");
    if (parentDiv != null) {
      let childDiv = document.querySelector("#" + val).childNodes;
      if (childDiv && childDiv.length > 0) {
        $("#stackMdl").show();
        Array.from(childDiv).forEach(child => {
          if (child.getAttribute("newclass") != null)
            child.className = child.getAttribute("newclass")
          else
            child.className = child.getAttribute("data-original-class");

          parentDiv.appendChild(child);
        });
      }
    }
  }

  function toGetStack(){
    let childDiv = document.querySelector("#parent-100").childNodes;
    if (childDiv && childDiv.length > 0) {
        Array.from(childDiv).forEach(child => { 
          var id = child.getAttribute("stackparentid");
          if (id) {
              var parentDiv = document.getElementById(id);
              child.className = "inside bg-gray-200";
              changingStyle(child);
              parentDiv.appendChild(child);
          }
      });      
    }    
    $("#stackMdl").hide();
  }

  function closeStack() {
    toGetStack();
    document.querySelector("#hndIsMdl").value = "";
  }

  function isOutsideStackMdl(element) {
      let stackMdl = document.getElementById("mdl");
      return stackMdl.contains(element);
  }

  function changingStyle (draggedElement) {
    draggedElement.style.position = "";
    draggedElement.style.zIndex = "";
    draggedElement.style.left = "";
    draggedElement.style.top = "";
  }
    
  useEffect(() => {    
    import("bootstrap/dist/js/bootstrap");
    import("bootstrap/dist/js/bootstrap.bundle.min.js");

    
    // const button = document.getElementById("addMdl");
    // if (button) {
    //     button.addEventListener("click", closeStack);
    // }

      let offsetX = 0, offsetY = 0, isDragging = false;
      
      document.addEventListener("dblclick", (e) => {        
        if ($("#stackMdl").is(":visible") && e.target.parentNode.id == "parent-100") {  
          const draggable = e.target;  
                          
          isDragging = true;
          offsetX = e.clientX - draggable.offsetLeft;
          offsetY = e.clientY - draggable.offsetTop;
          draggable.style.cursor = "grabbing";          
        }
      }); 
      document.addEventListener("click", (e) => {        
        if ($("#stackMdl").is(":visible") && e.target.parentNode.id == "parent-100") {
        const draggable = e.target;  
        
        isDragging = false;
        draggable.style.cursor = "grab";
      }
    });
      document.addEventListener("mousemove", (e) => {        
        if ($("#stackMdl").is(":visible") && e.target.parentNode.id == "parent-100") {
          const draggable = e.target;  
          
          if (isDragging) {
              draggable.style.position = "absolute";
              draggable.style.left = `${e.clientX - offsetX}px`;
              draggable.style.top = `${e.clientY - offsetY}px`;
          }
          
          var modal = document.getElementById("mdl"); 
          const modalRect = modal.getBoundingClientRect();
          const elemRect = draggable.getBoundingClientRect();
          
          const isOutside = (
              elemRect.right < modalRect.left ||
              elemRect.left > modalRect.right ||
              elemRect.bottom < modalRect.top ||
              elemRect.top > modalRect.bottom
          );

          if (isOutside) {
            document.getElementById("stackMdl").style.display = "none"; 
            document.body.appendChild(e.target);  
            toGetStack(); 
          }
        }
      });      

      document.addEventListener("dragstart", function(event) {
        event.target.style.opacity = "0.4";
        event.dataTransfer.setData("Text", event.target.id);
        document.querySelector("#hndBoxId").value = event.target.id;

        if (event.target.getAttribute("data-original-parent") == null )
          event.target.setAttribute("data-original-parent", event.target.parentElement.id);  
        
        if (event.target.getAttribute("data-original-class") == null )
          event.target.setAttribute("data-original-class", event.target.className);  

        if (sessionStorage.getItem(event.target.id + "class") == null || sessionStorage.getItem(event.target.id + "class") == "undefined") 
          sessionStorage.setItem(event.target.id + "class", event.target.className); 

        //window.getComputedStyle(event.target).width        
      });
      
      document.addEventListener("dragend", function(event) {
        event.target.style.opacity = "1";          
      });
      
      document.addEventListener("dragenter", function(event) {
        var draggedElementId = document.querySelector("#hndBoxId").value;
        var draggedElementClass = document.getElementById(draggedElementId).className;

        if ( event.target.className.indexOf("DropTarget") !== -1 && event.target.className.indexOf("MdlDropTarget") < 0 && event.target.id != draggedElementId && draggedElementClass != "inside bg-gray-200") {
          event.target.style.boxShadow = "inset 0.5px 0.5px 2px #b8b8b8";
        }        
        
        if (!isOutsideStackMdl(event.target) && $("#stackMdl").is(":visible")) {
            document.body.appendChild(event.target);  
            toGetStack();     
        }         
      });
      
      document.addEventListener("dragover", function(event) {
        event.preventDefault();        
      });
      
      document.addEventListener("dragleave", function(event) {
        var draggedElementId = document.querySelector("#hndBoxId").value;
        var draggedElementClass = document.getElementById(draggedElementId).className;

        if ( event.target.className.indexOf("DropTarget") !== -1 && event.target.className.indexOf("MdlDropTarget") < 0 && event.target.id != draggedElementId && draggedElementClass != "inside bg-gray-200") {
          event.target.style.boxShadow = "";
        }
      });
    
      document.addEventListener("drop", function(event) {
        event.preventDefault();   
        
        var data = event.dataTransfer.getData("Text");
        var draggedElement = document.getElementById(data);
        var isModal = document.querySelector("#hndIsMdl").value;

        if (data != null)  {
          if ((event.target.className.indexOf("DropTarget") !== -1 && event.target != draggedElement && event.target.className.indexOf("MdlDropTarget") < 0 && document.getElementById(data).className != "inside bg-gray-200")) {
            event.target.style.boxShadow = "";          
            document.getElementById(data).style.opacity = "";

            if (event.target.getAttribute("stackparentid") == null )
              draggedElement.setAttribute("stackparentid", event.target.id);  

            document.getElementById(data).className = "inside bg-gray-200";

            event.target.appendChild(document.getElementById(data));
            event.target.addEventListener("click", () => openModal(event.target.id));            
          }
          else if (event.target == draggedElement) {
            return;
          }          
          else if (isModal == "1") { 
             if (!$("#stackMdl").is(":visible"))  {              
              draggedElement.removeAttribute("stackParentId");
              var originalParentId = draggedElement.getAttribute("data-original-parent");

              if (originalParentId) {
                document.getElementById(data).className = sessionStorage.getItem(document.getElementById(data).id + "class");              
                document.getElementById(originalParentId).appendChild(draggedElement);
              }
              changingStyle(draggedElement);
              document.querySelector("#hndIsMdl").value = "";
             }
          }          
        }
      });     


}, []);
  return (   
    <div className="min-h-screen bg-gray-100 p-6" id="cer_cont"> 
    <input type="hidden" id="hndBoxId" name="hndBoxId" value=""></input>
    <input type="hidden" id="hndIsMdl" name="hndIsMdl" value=""></input>
      <div class="content" id="cer_cont1">                  
          <div className="grid grid-cols-3" >
            <div className="flex items-center justify-center " style={{height: "3rem"}}>
              <button style={{fontSize:"14px", borderRadius: "7px"}} className="absolute left-4 bg-black text-white p-2">
                <FaArrowLeft></FaArrowLeft>
              </button>
            </div>
            <div className="flex items-center justify-center" style={{height: "3rem"}}>
              <div className="fa-save"><FaSave style={{marginLeft:"3px"}}></FaSave></div>  
              <div className="dlpad" style={{marginRight:"10px"}}>Digital Launch Pad</div>          
              <div className="fa-save" style={{marginRight:"10px"}}><FaBars style={{marginLeft:"3px"}}></FaBars></div>  
            </div>
            <div className="flex items-center justify-center " style={{height: "3rem"}}>
              <button className="bg-green-500 text-white px-4 py-2 rounded-md absolute" style={{width:"108px", right:"20px"}}><FaUpload style={{ marginLeft: "-11px"}}></FaUpload><p style={{margin: "-19px -17px 0px 0px"}}>Publish</p> </button>            
            </div>
          </div>  
          <div className="w-1/2 mx-auto bg-blue-500 p-4 text-white mt-6 bg-white p-6 rounded-lg shadow-md relative scroll" >
            {/* Icon in Top Left */}
            <button style={{ fontSize:"14px", borderRadius: "10px;", marginTop:"-10px", width:"40px", height:"40px"}} className="absolute left-4 bg-black text-white p-2">
              <FaUser style={{fontSize:"20px",marginLeft:"2px"}}></FaUser>
            </button>

            {/* Grid Layout */}
            <div className="grid grid-cols-6  MdlDropTarget" id="parent-1" style={{ margin:"95px", marginLeft:"150px"}}>
                <div className="grid grid-rows-2 gap-4" id="parent-2" style={{paddingLeft:"10px", gridAutoRows: "minmax(0, 1fr)"}}>
                    <div className="relative justify-center items-center flex bg-gray-200 rounded-lg h-32 square-box" draggable="true"  id="drag-1" ></div>                  
                    <div className="bg-gray-200 justify-center items-center flex rounded-lg h-32 square-box" id="drag-2"></div>
                </div>
                <div className="h-s" id="parent-3">
                  <div className="bg-gray-200 rounded-lg h-32 flex items-center justify-center square-box DropTarget" draggable="true" id="drag-3" style={{background: "#3D8641"}}></div>
                </div>
                <div className="h-s" id="parent-4">
                  <div className="bg-gray-200 rounded-lg h-32 justify-center items-center flex items-center justify-center square-box" id="drag-4"></div>
                </div>
                <div id="parent-5">
                  <div className="bg-gray-200 justify-center items-center flex rounded-lg h-32 rectangle-box" id="drag-5" ></div>
                </div>      
                <div className="h-r" id="parent-6">
                  <div className="bg-gray-200 justify-center items-center flex rounded-lg h-32 col-span-2 long-rectangle" id="drag-6"></div>
                </div>
                <div className="bg-gray-200 rounded-lg justify-center items-center flex h-32 col-start-2 col-span-2 ph DropTarget" newclass="bg-gray-200 sph col-span-2 ph" style={{background: "#5691E8"}} draggable="true" id="drag-7"></div>
            </div>

            {/* Right Control Buttons */} 
            <div className="absolute top-4 right-4 flex space-x-2">          
              <div className="bg-black blackbox" >              
                    <button style={{borderRadius:"7px",marginLeft:"4px",background:"white  !important", color:"black !important", marginTop:"3px"}} className="bg-black text-white p-2 ">
                      <FaDesktop />
                    </button>
                  <button className="bg-black text-white p-2 " style={{marginLeft: "9px", fontSize:"18px"}}>         
                    <FaTablet />
                  </button>
                  <button className="bg-black text-white p-2 " style={{marginLeft: "-5px", fontSize:"18px"}}>         
                    <FaMobile />
                  </button>
              </div> 
            </div>
            <div id="addMdl"  className="absolute add-modal bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded-full flex items-center space-x-2">
                <div>
                  <div className="single">
                      <FaPlus style={{marginTop:"20px", marginLeft: "20px"}}></FaPlus>
                  </div>
                  <span style={{top:"74px", position:"absolute", left:"17px"}}>Single</span>
                </div>
                <div>
                  <div className="stack">
                    <div className="stack-inner"> 
                    <FaPlus style={{marginTop:"24px", marginLeft: "24px"}}></FaPlus>
                    </div>                     
                  </div>
                  <span style={{top:"74px", position:"absolute", left:"102px"}}>Stack</span>
                </div>
                <div>
                  <div className="single" style={{left:"160px !important"}}>
                     <span className="t-text">T</span>
                  </div>
                  <span style={{top:"74px", position:"absolute", left:"170px"}}>Note</span>
                </div>
                <div>
                  <div className="divider">
                     <div className="t-text-divider"><span className="t-text" style={{marginLeft: "17px"}}>T</span></div>
                  </div>
                  <span style={{top:"74px", position:"absolute", left:"237px"}}>Divider</span>
                </div>                
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded-full flex items-center space-x-2 add-container">
              <div className="addbox" onClick={openAddModal}> 
                  <span style={{marginLeft: "21px"}}><FontAwesomeIcon icon={faTableCells} style={{marginLeft: "4px"}} /><p style={{margin: "-30px 0px 0px 0px", marginLeft:"53px;"}}>Add</p></span> 
              </div>
              <span className="half-circle" ><FontAwesomeIcon style={{marginLeft: "7px", color:"black", fontSize:"15px"}} icon={faCircleHalfStroke} /></span><span style={{fontSize:"30px", marginLeft:"22px"}} ><FaImages /></span><span style={{marginLeft:"22px"}} ><div className="rainbow"></div></span>
            </div>
          </div>
        </div>

        {/* Modal */}
        <div className="modal" id="stackMdl">
          <div class="modal-content" id="mdl">
            <div className="col-lg-12" style={{marginBottom: "30px"}}>
                <div className="row">
                  <div className="col-lg-6"><input className="modalInput" type="text" placeholder="Add title"></input></div>
                  <div className="col-lg-6"><div style={{width: "18px", height: "24px", float: "right"}}><button id="btnCloseMdl" style={{fontSize:"20px", borderRadius: "7px"}} className="absolute bg-black text-white p-2" ><FaTimes></FaTimes></button></div></div>
                </div>
              </div>
              <div className="grid grid-cols-6" id="parent-100">
                
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded-full flex items-center space-x-2 add-container">
              <div className="addbox"> 
                  <span style={{marginLeft: "21px"}}><FontAwesomeIcon icon={faTableCells} style={{marginLeft: "4px"}} /><p style={{margin: "-30px 0px 0px 0px", marginLeft:"53px;"}}>Add</p></span> 
              </div>
              <span className="half-circle" ><FontAwesomeIcon style={{marginLeft: "7px", color:"black", fontSize:"15px"}} icon={faCircleHalfStroke} /></span><span style={{fontSize:"30px", marginLeft:"22px"}} ><FaImages /></span><span style={{marginLeft:"22px"}} ><div className="rainbow"></div></span>
            </div>
            </div>
        </div>
    </div> 
  );
}
