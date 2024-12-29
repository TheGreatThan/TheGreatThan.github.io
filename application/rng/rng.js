
const nav = document.querySelector("#navArea");
const btn = document.querySelector(".toggle-btn");
const mask = document.querySelector("#mask");

btn.onclick = () => {
    nav.classList.toggle("open");
};

mask.onclick = () => {
    nav.classList.toggle("open");
};


const rarities = [
    { name: "Common", class: "common", rate: 1 / 2, id: "CM" },
    { name: "Uncommon", class: "uncommon", rate: 1 / 16, id: "UM" },
    { name: "Rare", class: "rare", rate: 1 / 32, id: "RM" },
    { name: "Epic", class: "epic", rate: 1 / 64, id: "EP" },
    { name: "Legendary", class: "legendary", rate: 1 / 128, id: "LG" },
    { name: "Mythic", class: "mythic", rate: 1 / 1000, id: "MY" },
];

const pullButton = document.getElementById("pull-button");
const rollDisplay = document.getElementById("roll-display");
const inventoryButton = document.getElementById("inventory-button");
const inventory = document.getElementById("inventory");
const inventoryDetailsElement = document.querySelector(".inventory-details");
const inventoryCountElement = document.querySelector(".inventory-count");
let equippedRarity = null;
const inventoryCounts = {};

pullButton.addEventListener("click", () => {
    // Hide the Pull button
    pullButton.classList.add("hidden");

    rollDisplay.innerHTML = '';
    rollDisplay.className = '';
    document.getElementById('congrats-message').classList.add("hidden");

    rarities.forEach((rarity, index) => {
        const rarityElement = document.createElement("div");
        rarityElement.textContent = `${rarity.name} (${(rarity.rate * 100).toFixed(2)}%)`;
        rarityElement.className = `${rarity.class} rate`;
        rarityElement.style.animationDelay = `${index * 0.2}s`;
        rollDisplay.appendChild(rarityElement);
    });

    setTimeout(() => {
        rollDisplay.childNodes.forEach(node => {
            node.classList.add("wave-animation");
        });

        setTimeout(() => {
            rollDisplay.childNodes.forEach(node => {
                node.classList.remove("wave-animation");
            });

            const rarity = getRandomRarity();
            handleRarityAppearance(rarity);

            // Show the Pull button again after everything is done
            pullButton.classList.remove("hidden");
        }, 2000);
    }, 0);
});

inventoryButton.addEventListener("click", () => {
    inventory.classList.toggle("hidden");
});

function getRandomRarity() {
    const totalRate = rarities.reduce((sum, rarity) => sum + rarity.rate, 0);
    const randomNum = Math.random() * totalRate;

    let rateSum = 0;
    for (let i = 0; i < rarities.length; i++) {
        rateSum += rarities[i].rate;
        if (randomNum < rateSum) {
            return { ...rarities[i], index: i };
        }
    }
}

function addToInventory(rarity) {
    const rarityObject = rarities.find(r => r.name === rarity);
    const rarityId = rarityObject.id;

    if (!inventoryCounts[rarity]) {
        inventoryCounts[rarity] = 1;
        const item = document.createElement("div");
        item.classList.add("inventory-item");
        item.id = `inventory-${rarityId}`;
        item.innerHTML = `<span class="rarity-name">${rarity}</span> <button class="equip-button" onclick="toggleEquip('${rarityId}')">Equip</button>`;
        item.classList.add(rarityObject.class);
        inventory.appendChild(item);
    } else {
        inventoryCounts[rarity]++;
    }

    const totalCount = Object.values(inventoryCounts).reduce((sum, count) => sum + count, 0);
    inventoryCountElement.textContent = `Inventory: ${totalCount}`;
    updateInventoryDetails();
}

function updateInventoryDetails() {
    inventoryDetailsElement.innerHTML = Object.entries(inventoryCounts).map(([rarity, count]) => {
        const rarityObject = rarities.find(r => r.name === rarity);
        return `<div class="inventory-item ${rarityObject.class}">
                    ${rarity}: ${count}
                    <button class="equip-button" onclick="toggleEquip('${rarityObject.id}')">${equippedRarity && equippedRarity.name === rarity ? 'Unequip' : 'Equip'}</button>
                </div>`;
    }).join('');
}

function toggleEquip(rarityId) {
    const rarityObject = rarities.find(r => r.id === rarityId);
    if (equippedRarity) {
        document.querySelector(`#inventory-${equippedRarity.id}`).classList.remove("equipped");
        hideRarityEffect(equippedRarity);
    }

    const rarityElements = document.querySelectorAll(`#inventory-${rarityId}, .inventory-details .inventory-item`);
    rarityElements.forEach(item => {
        const button = item.querySelector(".equip-button");
        if (button.textContent === "Equip") {
            button.textContent = "Unequip";
            showRarityEffect(rarityObject);
            item.classList.add("equipped");
            equippedRarity = rarityObject;
        } else {
            button.textContent = "Equip";
            hideRarityEffect(rarityObject);
            item.classList.remove("equipped");
            equippedRarity = null;
        }
    });
}

function showRarityEffect(rarity) {
    if (rarity.name === "Common") {
        document.body.style.backgroundColor = "lightgrey";
        document.body.appendChild(message);
    } else if (rarity.name === "Uncommon") {
        document.body.style.color = "lightblue";
        document.body.classList.add("uncommon-effect");
    } else if (rarity.name === "Rare") {
        document.body.classList.add("rare-effect");
    } else if (rarity.name === "Epic") {
        document.body.style.backgroundImage = "url('cloud.gif')";
        document.body.classList.add("epic-effect");
    } else if (rarity.name === "Legendary") {
        document.body.style.backgroundImage = "url('Gold.gif')";
        document.body.classList.add("legendary-effect");
    } else if (rarity.name === "Mythic") {
        document.body.style.backgroundImage = "url('mythic.gif')";
        document.body.classList.add("mythic-effect");
        const message = document.createElement("div");
        message.classList.add("mythic-message");
        message.textContent = "Surprise! You thought it was something cool huh? Get Rick Rolled LOL =)";
        document.body.appendChild(message);
    }

    console.log(`Equipped: ${rarity.name}`);
}

function hideRarityEffect(rarity) {
    document.body.style.backgroundColor = "";
    document.body.style.backgroundImage = "";
    document.body.style.color = "";
    document.body.classList.remove("uncommon-effect");
    document.body.classList.remove("rare-effect");
    document.body.classList.remove("epic-effect");
    document.body.classList.remove("legendary-effect");
    document.body.classList.remove("mythic-effect");
    const message = document.querySelector(".mythic-message");
    if (message) {
        document.body.removeChild(message);
    }
    console.log(`Unequipped: ${rarity.name}`);
}

function handleRarityAppearance(rarity) {
    if (rarity.index > 3) { // Super Epic and rarer
        document.body.classList.add("special-bg");
        rollDisplay.innerHTML = rarity.name;
        rollDisplay.className = `floating ${rarity.class}`;

        if (rarity.name === "Legendary" || rarities.name == "Mythic") {
            rollDisplay.classList.add("shake-pop");
        }

        const congratsMessage = document.getElementById('congrats-message');
        congratsMessage.textContent = `You got a ${rarity.name}!`;
        congratsMessage.classList.remove("hidden");

        const claimButton = document.getElementById('claim-button');
        claimButton.classList.remove("hidden");
        claimButton.onclick = () => {
            document.body.classList.remove("special-bg");
            claimButton.classList.add("hidden");
            congratsMessage.classList.add("hidden");
            rollDisplay.className = '';
            rollDisplay.innerHTML = '';
            addToInventory(rarity.name);
        };
    } else {
        rollDisplay.innerHTML = rarity.name;
        rollDisplay.className = rarity.class;
        addToInventory(rarity.name);
    }
}
const curser = document.querySelector(".curser");
document.addEventListener('mousemove', function(e){
  let X = e.clientX;
  let Y = e.clientY;

  curser.style.left = X + "px";
  curser.style.top = Y + "px";
})

document.addEventListener("DOMContentLoaded", () => {
    const cursor = document.createElement('div');
    cursor.id = 'cursor';
    document.body.appendChild(cursor);
  
    let timeoutId;
  
    const resetCursorTimeout = () => {
      cursor.style.opacity = '1'; // Show the cursor
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        cursor.style.opacity = '0'; // Hide the cursor
      }, 3000); // 3 seconds
    };
  
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.pageX}px`;
      cursor.style.top = `${e.pageY}px`;
      resetCursorTimeout();
    });
  
    const interactableClasses = ['interactable', 'toggle-btn', 'hidden'];
  
    interactableClasses.forEach(className => {
        const elements = document.querySelectorAll(`.${className}`);
  
        elements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('interacting');
            });
  
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('interacting');
            });
        });
    });
  });