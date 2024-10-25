import React from 'react';

/**
 * @function PolicyList
 * @description Component to display the list of policyholders.
 * @param {Array} policies - List of policyholder addresses.
 */
function PolicyList({ policies }) {
  return (
    <div>
      <h2>Policy Holders</h2>
      <ul>
        {/* Iterate over the list of policies and display each one */}
        {policies.map((policy, index) => (
          <li key={index}>{policy}</li>
        ))}
      </ul>
    </div>
  );
}

export default PolicyList;
