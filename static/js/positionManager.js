import{state as t}from"./constants.js";import{ui as i}from"./uiUtils.js";export const positionManager={positions:["leftInside","center","rightInside"],positionNames:{leftInside:"左侧",center:"中间",rightInside:"右侧"},autoPositionMode:!0,manualPositions:{},positionCounter:0,init(){this.loadPositionConfig();let t=document.getElementById("autoPositionCheckbox");t&&t.addEventListener("change",t=>{this.autoPositionMode=t.target.checked,this.toggleManualConfig()});let i=document.getElementById("savePositionsBtn");i&&i.addEventListener("click",()=>this.savePositions());let o=document.getElementById("resetPositionsBtn");o&&o.addEventListener("click",()=>this.resetPositions())},loadPositionConfig(){let t=localStorage.getItem("bestdori_position_config");if(t)try{let i=JSON.parse(t);this.autoPositionMode=!1!==i.autoPositionMode,this.manualPositions=i.manualPositions||{},this.ensurePositionFormat()}catch(o){console.error("加载位置配置失败:",o)}},ensurePositionFormat(){let t={};for(let[i,o]of Object.entries(this.manualPositions))"string"==typeof o?t[i]={position:o,offset:0}:t[i]={position:o.position||"center",offset:o.offset||0};this.manualPositions=t},savePositionConfig(){let t={autoPositionMode:this.autoPositionMode,manualPositions:this.manualPositions};localStorage.setItem("bestdori_position_config",JSON.stringify(t))},getAvatarId:t=>({229:6,337:1,338:2,339:3,340:4,341:5})[t]||t,openPositionModal(){let t=document.getElementById("autoPositionCheckbox");t&&(t.checked=this.autoPositionMode),this.renderPositionList(),this.toggleManualConfig(),i.openModal("positionModal")},closePositionModal(){i.closeModal("positionModal")},toggleManualConfig(){let t=document.getElementById("manualPositionConfig");t&&(t.style.display=this.autoPositionMode?"none":"block")},renderPositionList(){let i=document.getElementById("positionList");if(!i)return;i.innerHTML="";let o=Object.entries(t.currentConfig).sort(([,t],[,i])=>{let o=t&&t.length>0?t[0]:1/0,s=i&&i.length>0?i[0]:1/0;return o-s});o.forEach(([t,o])=>{if(!o||0===o.length)return;let s=o[0],e=this.getAvatarId(s),n=e>0?`/static/images/avatars/${e}.png`:"",a=this.manualPositions[t]||{position:"center",offset:0},l=a.position||"center",r=a.offset||0,c=document.createElement("div");c.className="position-config-item",c.innerHTML=`
                <div class="position-character-info">
                    <div class="config-avatar-wrapper">
                        <div class="config-avatar" data-id="${s}">
                            ${e>0?`<img src="${n}" alt="${t}" class="config-avatar-img" onerror="this.style.display='none'; this.parentElement.innerHTML='${t.charAt(0)}'; this.parentElement.classList.add('fallback');">`:t.charAt(0)}
                        </div>
                    </div>
                    <span class="position-character-name">${t} (ID: ${s})</span>
                </div>
                <div class="position-controls">
                    <select class="form-input position-select" data-character="${t}">
                        ${this.positions.map(t=>`<option value="${t}" ${t===l?"selected":""}>
                                ${this.positionNames[t]}
                            </option>`).join("")}
                    </select>
                    <div class="position-offset-group">
                        <label class="position-offset-label" for="offset-${t}">偏移:</label>
                        <input type="number" 
                            id="offset-${t}"
                            class="form-input position-offset-input" 
                            data-character="${t}"
                            value="${r}"
                            step="10"
                            placeholder="0"
                            title="设置水平偏移量，正值向右，负值向左">
                        <span class="position-offset-hint">px</span>
                    </div>
                </div>
            `;let f=c.querySelector(".position-select");f.addEventListener("change",t=>{let i=t.target.dataset.character;this.manualPositions[i]||(this.manualPositions[i]={position:"center",offset:0}),this.manualPositions[i].position=t.target.value});let d=c.querySelector(".position-offset-input");d.addEventListener("input",t=>{let i=t.target.dataset.character,o=parseInt(t.target.value)||0;this.manualPositions[i]||(this.manualPositions[i]={position:"center",offset:0}),this.manualPositions[i].offset=o}),i.appendChild(c)})},async savePositions(){await i.withButtonLoading("savePositionsBtn",async()=>{await new Promise(t=>setTimeout(t,300)),this.savePositionConfig(),i.showStatus("位置配置已保存！","success"),this.closePositionModal()},"保存中...")},async resetPositions(){confirm("确定要将所有角色的位置恢复为默认（中间）并清除偏移吗？")&&await i.withButtonLoading("resetPositionsBtn",async()=>{this.autoPositionMode=!0,this.manualPositions={},document.querySelectorAll(".position-select").forEach(t=>{t.value="center"}),document.querySelectorAll(".position-offset-input").forEach(t=>{t.value="0"});let t=document.getElementById("autoPositionCheckbox");t&&(t.checked=!0),this.toggleManualConfig(),await new Promise(t=>setTimeout(t,300)),this.savePositionConfig(),i.showStatus("已恢复默认位置配置！","success")},"重置中...")},getCharacterPositionConfig(t,i){if(this.autoPositionMode)return{position:this.positions[i%this.positions.length],offset:0};{let o=this.manualPositions[t]||{position:"center",offset:0};return{position:o.position||"center",offset:o.offset||0}}},resetPositionCounter(){this.positionCounter=0}};window.positionManager=positionManager;