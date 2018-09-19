const factoryAbi = [
  {
    "anonymous": false,
    "inputs": [],
    "name": "DomainTransfersLocked",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "lockDomainOwnershipTransfers",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_subdomain",
        "type": "string"
      },
      {
        "name": "_domain",
        "type": "string"
      },
      {
        "name": "_topdomain",
        "type": "string"
      },
      {
        "name": "_owner",
        "type": "address"
      },
      {
        "name": "_target",
        "type": "address"
      }
    ],
    "name": "newSubdomain",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "transferContractOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_node",
        "type": "bytes32"
      },
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "transferDomainOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "creator",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "subdomain",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "domain",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "topdomain",
        "type": "string"
      }
    ],
    "name": "SubdomainCreated",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_registry",
        "type": "address"
      }
    ],
    "name": "updateRegistry",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "previousResolver",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "newResolver",
        "type": "address"
      }
    ],
    "name": "ResolverUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "previousRegistry",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "newRegistry",
        "type": "address"
      }
    ],
    "name": "RegistryUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "inputs": [
      {
        "name": "_registry",
        "type": "address"
      },
      {
        "name": "_resolver",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_resolver",
        "type": "address"
      }
    ],
    "name": "updateResolver",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_domain",
        "type": "string"
      },
      {
        "name": "_topdomain",
        "type": "string"
      }
    ],
    "name": "domainOwner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "locked",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "registry",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "resolver",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_subdomain",
        "type": "string"
      },
      {
        "name": "_domain",
        "type": "string"
      },
      {
        "name": "_topdomain",
        "type": "string"
      }
    ],
    "name": "subdomainOwner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];
const emptyAddress = '0x0000000000000000000000000000000000000000'
const factoryAddress = "0x128f9f878a5e1ba33cdcc3431c5b6068a0524071"
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
    } else {
      alert('You need metamask or use a mobile wallet Dapp browser to use tenz-id. Download from https://metamask.io');
    }
  } else if(window.location.href.indexOf("confirmation") > -1) {
    confirmationPageTenz()
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
  ensContract = eth.contract(factoryAbi).at(factoryAddress)
}

function checkENS(input) {
  $('.tenz-ens').val(input.toLowerCase())
  if (input.length === 0) {
    $('#ens-status-wrapper').css('background-color', '#d4d1e8');
    $('#ens-status-wrapper').css('color', '#6963b3');
    $('#ens-status-wrapper').html("Enter a valid username");
    $("#register-tenz-id-button").attr("disabled", true);
    return;
  }
  ensName = input.toLowerCase();
  ensContract.subdomainOwner(input, 'tenz-id', 'xyz')
    .then(function (addr) {
      if(addr[0] === emptyAddress){
        $('#ens-status-wrapper').html("It's available! Go for it tiger!");
        $('#ens-status-wrapper').css('background-color', '#c9e8bd');
        $('#ens-status-wrapper').css('color', '#348432');
        $('#ens-status-wrapper').css('margin-top', '15px');
        $('#ens-status-wrapper').css('padding', '10px');
        $('#ens-status-wrapper').css('border-radius', '10px');
        $('#register-tenz-id-button').css('border-radius', '10px');
        $("#register-tenz-id-button").attr("disabled", false);
      } else if(addr[0] === currentAccount) {
        $('#ens-status-wrapper').html("You have claimed this already!");
        $('#ens-status-wrapper').css('background-color', '#d4d1e8');
        $('#ens-status-wrapper').css('color', '#6963b3');
        $('#ens-status-wrapper').css('margin-top', '15px');
        $('#ens-status-wrapper').css('padding', '10px');
        $('#ens-status-wrapper').css('border-radius', '10px');
        $("#register-tenz-id-button").attr("disabled", true);
      } else if(addr[0] === '0x') {
        $('#ens-status-wrapper').html("Switch to mainnet");
        $('#ens-status-wrapper').css('background-color', '#e8b0b4');
        $('#ens-status-wrapper').css('color', '#b3323b');
        $('#ens-status-wrapper').css('margin-top', '15px');
        $('#ens-status-wrapper').css('padding', '10px');
        $('#ens-status-wrapper').css('border-radius', '10px');
        $("#register-tenz-id-button").attr("disabled", true);
      } else {
        $('#ens-status-wrapper').html("Oops! Already owned by: " + addr[0]);
        $('#ens-status-wrapper').css('background-color', '#e8b0b4');
        $('#ens-status-wrapper').css('color', '#b3323b');
        $('#ens-status-wrapper').css('margin-top', '15px');
        $('#ens-status-wrapper').css('padding', '10px');
        $('#ens-status-wrapper').css('border-radius', '10px');
        $("#register-tenz-id-button").attr("disabled", true);
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
    $("#register-tenz-id-button").attr("disabled", true);
    return false;
  } else if (/^(0x)?[0-9a-f]{40}$/.test(input) || /^(0x)?[0-9A-F]{40}$/.test(input)) {
    $('#pa-status-wrapper').html("Valid address");
    $('#pa-status-wrapper').css('background-color', '#c9e8bd');
    $('#pa-status-wrapper').css('color', '#348432');
    $('#pa-status-wrapper').css('margin-top', '15px');
    $('#pa-status-wrapper').css('padding', '10px');
    $('#pa-status-wrapper').css('border-radius', '10px');
    $("#register-tenz-id-button").attr("disabled", true);
    return true;
  }
  ensAddress = input;
}

function listenForClicks () {
  var button = document.getElementById('register-tenz-id-button');
  button.addEventListener('click', function() {
    ensContract.newSubdomain(ensName, 'tenz-id', 'xyz', currentAccount, currentAccount, {from: currentAccount})
      .then((txHash) => {
        localStorage.setItem('ensName', ensName);
        localStorage.setItem('txHash', txHash);
        window.location = 'https://tenzorum.org/confirmation'
      })
      .catch(console.log)
  })
}

function confirmationPageTenz() {
  // $('.ua-icon.ua-icon-twitter-2').click(function() {
  //   window.open('http://twitter.com/share?text=Wah gwan my youth. Represent the most high, I and I with a share pon d tweetah &url=https://tenzorum.org/tenz_id&hashtags=blockchain,tenzorum&\n')
  // })
  var twitterButton = document.getElementById('twitter-tenzorum-button');
  twitterButton.addEventListener('click', function() {
    window.open('http://twitter.com/share?text=Wah gwan my youth. Represent the most high, I and I with a share pon d tweetah &url=https://tenzorum.org/tenz_id&hashtags=blockchain,tenzorum&\n')
  })
  $('#updateh1 > div > div > h1 > span').html(`Congratulations ${localStorage.ensName} ! You have successfully claimed your TENZ-ID: <br/> 🎉${localStorage.ensName}.tenz-id.xyz 🎉`);
  $('#update2 > div > div >  h3 > span').html(`👉 It's immutabily stored in the Ethereum Blockchain and can be viewed <a href="https://ropsten.etherscan.io/tx/${localStorage.txHash}" target="_blank"><b><u>HERE</u></b></a>`);
}