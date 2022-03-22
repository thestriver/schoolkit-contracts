const main = async () => {
    const schoolkitContractFactory = await hre.ethers.getContractFactory(
      "DonateKit"
    );
    const schoolkitContract = await schoolkitContractFactory.deploy({
      value: hre.ethers.utils.parseEther("0.1"),
    });
    await schoolkitContract.deployed();
    console.log("SchoolKit Contract deployed to:", schoolkitContract.address);
  
    /*
     * Get Contract balance
     */
    let contractBalance = await hre.ethers.provider.getBalance(
        schoolkitContract.address
    );
    console.log(
      "Contract balance:",
      hre.ethers.utils.formatEther(contractBalance)
    );
  
    /*
     * donation test
     */
    const donationTxn = await schoolkitContract.donateSchoolKit(
      "This is donation #1",
      "Cheerful Giver",
      ethers.utils.parseEther("0.01")
    );
    await donationTxn.wait();
  
    /*
     * retrieve Contract balance to check if it works
     */
    contractBalance = await hre.ethers.provider.getBalance(
        schoolkitContract.address
    );
    console.log(
      "Contract balance:",
      hre.ethers.utils.formatEther(contractBalance)
    );
  
    let allDonations = await schoolkitContract.getAllSchoolKits();
    console.log(allDonations);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();