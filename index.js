const factoryAbi = [{"anonymous":false,"inputs":[],"name":"DomainTransfersLocked","type":"event"},{"constant":false,"inputs":[],"name":"lockDomainOwnershipTransfers","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_subdomain","type":"string"},{"name":"_domain","type":"string"},{"name":"_topdomain","type":"string"},{"name":"_owner","type":"address"},{"name":"_target","type":"address"}],"name":"newSubdomain","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousRegistry","type":"address"},{"indexed":true,"name":"newRegistry","type":"address"}],"name":"RegistryUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"creator","type":"address"},{"indexed":true,"name":"owner","type":"address"},{"indexed":false,"name":"subdomain","type":"string"},{"indexed":false,"name":"domain","type":"string"},{"indexed":false,"name":"topdomain","type":"string"}],"name":"SubdomainCreated","type":"event"},{"constant":false,"inputs":[{"name":"_owner","type":"address"}],"name":"transferContractOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousResolver","type":"address"},{"indexed":true,"name":"newResolver","type":"address"}],"name":"ResolverUpdated","type":"event"},{"constant":false,"inputs":[{"name":"_node","type":"bytes32"},{"name":"_owner","type":"address"}],"name":"transferDomainOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_registry","type":"address"}],"name":"updateRegistry","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_resolver","type":"address"}],"name":"updateResolver","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_registry","type":"address"},{"name":"_resolver","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[{"name":"_domain","type":"string"},{"name":"_topdomain","type":"string"}],"name":"domainOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"locked","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"registry","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"resolver","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_subdomain","type":"string"},{"name":"_domain","type":"string"},{"name":"_topdomain","type":"string"}],"name":"subdomainOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_subdomain","type":"string"},{"name":"_domain","type":"string"},{"name":"_topdomain","type":"string"}],"name":"subdomainTarget","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}];
const emptyAddress = '0x0000000000000000000000000000000000000000';
const factoryAddress = "0xe47405AF3c470e91a02BFC46921C3632776F9C6b"; //mainnet
// const factoryAddress = "0x62d6c93df120fca09a08258f3a644b5059aa12f0"; //ropsten
let currentAccount;
let ensName;
let ensAddress;
let ensContract;
let addressAvailable = false;
let gasPrice;
fetch('https://ethgasstation.info/json/ethgasAPI.json')
  .then(res => res.json())
  .then(json => gasPrice = json);

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
    } else {
      alert('You need metamask or use a mobile wallet Dapp browser to use tenzID. Download from https://metamask.io');
    }
  } else if(window.location.href.indexOf("confirmation") > -1) {
    confirmationPageTenz()
  }
})

function startApp(web3) {
  const eth = new window.Eth(web3.currentProvider)

  listenForClicks(ensContract,web3);
  web3.eth.getAccounts(function(err, accounts) {
    if (accounts.length !== 0) {
      ensAddress = accounts[0];
      currentAccount = accounts[0];
      checkPublicAddress(accounts[0]);
      jQuery('#public-address').val(accounts[0]);
    } else {
      alert("Unlock or setup your metamask")
    }
  })
  ensContract = eth.contract(factoryAbi).at(factoryAddress)
}

function checkENS(input) {
  jQuery('.tenz-ens').val(input.toLowerCase())
  if (input.length === 0) {
    jQuery('#ens-status-wrapper').css('background-color', '#d4d1e8');
    jQuery('#ens-status-wrapper').css('color', '#6963b3');
    jQuery('#ens-status-wrapper').html("Enter a valid username");
    jQuery("#register-tenz-id-button").attr("disabled", true);
    return;
  }
  ensName = input.toLowerCase();
  ensContract.subdomainOwner(input, 'tenzorum-id', 'eth')
    .then(function (addr) {
      if(addr[0] === emptyAddress){
        addressAvailable = true;
        jQuery('#ens-status-wrapper')
          .html("It's available! Go for it tiger!")
          .css({
            'background-color':'#c9e8bd',
            'color':'#348432',
            'margin-top':'15px',
            'padding':'10px',
            'border-radius':'10px'
          });
        jQuery('#register-tenz-id-button')
          .css('border-radius', '10px')
          .attr({
            "disabled": false,
            "cursor":"pointer"
          })
          .mouseover(function() {
            jQuery(this).css("background-color", "#6963b3")
          })
          .mouseout(function() {
            jQuery(this).css("background-color", "#FC1272")
          })
      } else if(addr[0] === ensAddress) {
        addressAvailable = false;
        jQuery('#ens-status-wrapper').html("You have claimed this already!");
        jQuery('#ens-status-wrapper').css('background-color', '#d4d1e8');
        jQuery('#ens-status-wrapper').css('color', '#6963b3');
        jQuery('#ens-status-wrapper').css('margin-top', '15px');
        jQuery('#ens-status-wrapper').css('padding', '10px');
        jQuery('#ens-status-wrapper').css('border-radius', '10px');
        jQuery("#register-tenz-id-button")
          .attr("disabled", true)
          .mouseover(function() {
            jQuery(this).css("background-color", "#9e9e9e")
          })
          .mouseout(function() {
            jQuery(this).css("background-color", "#FC1272")
          })
      } else if(addr[0] === '0x') {
        addressAvailable = false;
        jQuery('#ens-status-wrapper').html("Switch to mainnet");
        jQuery('#ens-status-wrapper').css('background-color', '#e8b0b4');
        jQuery('#ens-status-wrapper').css('color', '#b3323b');
        jQuery('#ens-status-wrapper').css('margin-top', '15px');
        jQuery('#ens-status-wrapper').css('padding', '10px');
        jQuery('#ens-status-wrapper').css('border-radius', '10px');
        jQuery("#register-tenz-id-button")
          .attr("disabled", true)
          .mouseover(function() {
            jQuery(this).css("background-color", "#9e9e9e")
          })
          .mouseout(function() {
            jQuery(this).css("background-color", "#FC1272")
          })
      } else {
        addressAvailable = false;
        jQuery('#ens-status-wrapper').html("Oops! Already owned by: " + addr[0]);
        jQuery('#ens-status-wrapper').css('background-color', '#e8b0b4');
        jQuery('#ens-status-wrapper').css('color', '#b3323b');
        jQuery('#ens-status-wrapper').css('margin-top', '15px');
        jQuery('#ens-status-wrapper').css('padding', '10px');
        jQuery('#ens-status-wrapper').css('border-radius', '10px');
        jQuery("#register-tenz-id-button")
          .attr("disabled", true)
          .mouseover(function() {
            jQuery(this).css("background-color", "#9e9e9e")
          })
          .mouseout(function() {
            jQuery(this).css("background-color", "#FC1272")
          })
      }
    })
    .catch(console.error)
}

function checkPublicAddress(input) {
  if (Eth.isAddress(input) === false) {
    jQuery('#pa-status-wrapper').html("Invalid address");
    jQuery('#pa-status-wrapper').css('background-color', '#e8b0b4');
    jQuery('#pa-status-wrapper').css('color', '#b3323b');
    jQuery('#pa-status-wrapper').css('margin-top', '15px');
    jQuery('#pa-status-wrapper').css('padding', '10px');
    jQuery('#pa-status-wrapper').css('border-radius', '10px');
    jQuery("#register-tenz-id-button").attr("disabled", true);
    return false;
  } else if (Eth.isAddress(input) === true) {
    jQuery('#pa-status-wrapper').html("Valid address");
    jQuery('#pa-status-wrapper').css('background-color', '#c9e8bd');
    jQuery('#pa-status-wrapper').css('color', '#348432');
    jQuery('#pa-status-wrapper').css('margin-top', '15px');
    jQuery('#pa-status-wrapper').css('padding', '10px');
    jQuery('#pa-status-wrapper').css('border-radius', '10px');
    jQuery("#register-tenz-id-button").attr("disabled", false);
    return true;
  }
  ensAddress = input;
}

function listenForClicks () {
  var button = document.getElementById('register-tenz-id-button');
  button.addEventListener('click', function() {
    ensContract.newSubdomain(ensName, 'tenzorum-id', 'eth', ensAddress, ensAddress, {from: currentAccount, gasPrice:(gasPrice.fast+20)*100000000})
      .then((txHash) => {
        localStorage.setItem('ensName', ensName);
        localStorage.setItem('txHash', txHash);
        window.location = 'https://tenzorum.org/confirmation'
      })
      .catch(console.log)
  })
}

function confirmationPageTenz() {
  // jQuery('.ua-icon.ua-icon-twitter-2').click(function() {
  //   window.open('http://twitter.com/share?text=Wah gwan my youth. Represent the most high, I and I with a share pon d tweetah &url=https://tenzorum.org/tenz_id&hashtags=blockchain,tenzorum&\n')
  // })
  var twitterButton = document.getElementById('twitter-tenzorum-button');
  twitterButton.addEventListener('click', function() {
    // Change this to tweet a different message, after text=put message here after &url=put url here after &hashtags=put hashtags here
    window.open('http://twitter.com/share?text=🎉I just claimed my UNSTOPABBLE Blockchain Digital Identity with TENZ-ID 🚀@tenzorum! Get yours at  👉 &url=https://tenzorum.org/tenz_id&hashtags=blockchain,tenzorum,digitalidentity&\n')
  })
  jQuery('#updateh1 > div > div > h1 > span').html(`Congratulations ${localStorage.ensName}! You have submitted a claim for your TENZ-ID: <br/> 🎉${localStorage.ensName}.tenzorum-id.eth 🎉 <br/> View the status of your claim <a href="https://etherscan.io/tx/${localStorage.txHash}" target="_blank"><b><u>here</u></b></a>`);
  jQuery('#update2 > div > div >  h3 > span').html(`👉 It's immutably stored in the Ethereum Blockchain and can be viewed <a href="https://etherscan.io/tx/${localStorage.txHash}" target="_blank"><b><u>HERE</u></b></a>`);
}