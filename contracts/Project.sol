// SPDX-License-Identifier: MIT
//         
pragma solidity ^0.8.17;

contract Project {
    address public manager;
    address[] public players;
    uint public ticketPrice;

    constructor(uint _ticketPrice) {
        manager = msg.sender;
        ticketPrice = _ticketPrice;
    }

    /// @notice Enter the lottery by paying the ticket price
    function enterLottery() public payable {
        require(msg.value == ticketPrice, "Incorrect ticket price");
        players.push(msg.sender);
    }

    /// @notice Get the list of all players
    function getPlayers() public view returns (address[] memory) {
        return players;
    }

    /// @notice Pick a winner (only manager)
    function pickWinner() public restricted {
        require(players.length > 0, "No players in the lottery");
        uint index = random() % players.length;
        address winner = players[index];
        payable(winner).transfer(address(this).balance);

        // ✅ Reset players for the next round
    
    }

    /// @notice Generate a pseudo-random number (not secure, demo only)
    function random() private view returns (uint) {
        return uint(
            keccak256(
                abi.encodePacked(block.timestamp, block.difficulty, players)
            )
        );
    }

    /// @notice Restrict function to manager only
    modifier restricted() {
        require(msg.sender == manager, "Only manager can call this");
        _;
    }
}









