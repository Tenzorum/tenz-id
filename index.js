const factoryAbi =[{"constant":false,"inputs":[{"name":"_topLevelDomain","type":"string"},{"name":"_subDomain","type":"string"},{"name":"_owner","type":"address"},{"name":"_target","type":"address"}],"name":"newSubdomain","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"creator","type":"address"},{"indexed":true,"name":"owner","type":"address"},{"indexed":false,"name":"domain","type":"string"},{"indexed":false,"name":"subdomain","type":"string"}],"name":"SubdomainCreated","type":"event"},{"constant":true,"inputs":[{"name":"_subDomain","type":"string"},{"name":"_topLevelDomain","type":"string"}],"name":"subDomainOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}];
const emptyAddress = '0x0000000000000000000000000000000000000000'
const factoryAddress = "0xf9fa2ff44a474b6d20500969bda61c2827fbc6b6"
let currentAccount;
let ensName;
let ensAddress;
let ensContract;

window.addEventListener('load', function() {
  if(window.location.href.indexOf("tenz_id") > -1) {
    if (typeof web3 !== 'undefined') {
      web3.version.getNetwork((err, netId) => {
        switch (netId) {
          case "1":
            console.log('This is mainnet')
            break
          case "2":
            alert("Switch to mainnet on your wallet")
            break
          case "3":
            alert("Switch to mainnet on your wallet")

            break
          default:
            alert("Switch to mainnet on your wallet")
        }
      })
      startApp(web3);
      //alert("Web3");
    } else {
      alert('You need metamask or use a mobile wallet Dapp browser to use tenz-id. Download from https://metamask.io');
    }
  } else if(window.location.href.indexOf("confirmation") > -1) {
    confirm()
  }
})

function startApp(web3) {
  const eth = new Eth(web3.currentProvider)

  listenForClicks(ensContract,web3);
  web3.eth.getAccounts(function(err, accounts) {
    if (accounts.length !== 0) {
      currentAccount = accounts[0];
      checkPublicAddress(accounts[0]);
      $('#public-address').val(accounts[0]);
    } else {
      alert("Unlock or setup your metamask")
    }
  })
  ensContract = eth.contract(factoryAbi).at( factoryAddress)
}

function checkENS(input) {
  $('.tenz-ens').val(input.toLowerCase())
  if (input.length === 0) {
    $('#ens-status-wrapper').css('background-color', '#d4d1e8');
    $('#ens-status-wrapper').css('color', '#6963b3');
    $('#ens-status-wrapper').html("Enter a valid username");
    $("#submit-button").attr("disabled", true);
    return;
  }
  ensName = input.toLowerCase();
  const message = document.getElementById('ens-status-wrapper');
  ensContract.subDomainOwner(input, 'tenz-id')
    .then(function (addr) {
      if(addr[0] === emptyAddress){
        $('#ens-status-wrapper').html("It's available! Go for it tiger!");
        $('#ens-status-wrapper').css('background-color', '#c9e8bd');
        $('#ens-status-wrapper').css('color', '#348432');
        $('#ens-status-wrapper').css('margin-top', '15px');
        $('#ens-status-wrapper').css('padding', '10px');
        $('#ens-status-wrapper').css('border-radius', '10px');
        $('#submit-button').css('border-radius', '10px');
        $("#submit-button").attr("disabled", false);
      } else if(addr[0] === currentAccount) {
        $('#ens-status-wrapper').html("You have claimed this already!");
        $('#ens-status-wrapper').css('background-color', '#d4d1e8');
        $('#ens-status-wrapper').css('color', '#6963b3');
        $('#ens-status-wrapper').css('margin-top', '15px');
        $('#ens-status-wrapper').css('padding', '10px');
        $('#ens-status-wrapper').css('border-radius', '10px');
        $("#submit-button").attr("disabled", true);
      } else if(addr[0] === '0x') {
        $('#ens-status-wrapper').html("Switch to mainnet");
        $('#ens-status-wrapper').css('background-color', '#e8b0b4');
        $('#ens-status-wrapper').css('color', '#b3323b');
        $('#ens-status-wrapper').css('margin-top', '15px');
        $('#ens-status-wrapper').css('padding', '10px');
        $('#ens-status-wrapper').css('border-radius', '10px');
        $("#submit-button").attr("disabled", true);
      } else {
        $('#ens-status-wrapper').html("Oops! Already owned by: " + addr[0]);
        $('#ens-status-wrapper').css('background-color', '#e8b0b4');
        $('#ens-status-wrapper').css('color', '#b3323b');
        $('#ens-status-wrapper').css('margin-top', '15px');
        $('#ens-status-wrapper').css('padding', '10px');
        $('#ens-status-wrapper').css('border-radius', '10px');
        $("#submit-button").attr("disabled", true);
      }
    })
    .catch(console.error)
}

function checkPublicAddress(input) {
  if (!/^(0x)?[0-9a-f]{40}$/i.test(input)) {
    $('#pa-status-wrapper').html("Invalid address");
    $('#pa-status-wrapper').css('background-color', '#e8b0b4');
    $('#pa-status-wrapper').css('color', '#b3323b');
    $('#pa-status-wrapper').css('margin-top', '15px');
    $('#pa-status-wrapper').css('padding', '10px');
    $('#pa-status-wrapper').css('border-radius', '10px');
    $("#submit-button").attr("disabled", true);
    return false;
  } else if (/^(0x)?[0-9a-f]{40}$/.test(input) || /^(0x)?[0-9A-F]{40}$/.test(input)) {
    $('#pa-status-wrapper').html("Valid address");
    $('#pa-status-wrapper').css('background-color', '#c9e8bd');
    $('#pa-status-wrapper').css('color', '#348432');
    $('#pa-status-wrapper').css('margin-top', '15px');
    $('#pa-status-wrapper').css('padding', '10px');
    $('#pa-status-wrapper').css('border-radius', '10px');
    $("#submit-button").attr("disabled", true);
    return true;
  }
  ensAddress = input;
}

function listenForClicks () {
  var button = document.getElementById('submit-button');
  button.addEventListener('click', function() {
    console.log('ENS NAME: ', ensName)
    ensContract.newSubdomain(ensName, 'tenz-id', currentAccount, currentAccount, {from: currentAccount})
      .then((txHash) => {
        localStorage.setItem('ensName', ensName);
        localStorage.setItem('txHash', txHash);
        window.location = 'https://tenzorum.org/confirmation'
      })
      .catch(console.log)
  })
}

function confirm() {
  $('#updateh1 > div > div > h1 > span').html(`Congratulations ${localStorage.ensName} ! You have successfully claimed your TENZ-ID: ${localStorage.ensName}.tenz-id.xyz 🎉`);
  $('#updateh2 > div > div >  p').html(`Although its immutabily stored in the Ethereum Blockchain and can be viewed <a href="https://ropsten.etherscan.io/tx/${localStorage.txHash}">here</a>`);
}