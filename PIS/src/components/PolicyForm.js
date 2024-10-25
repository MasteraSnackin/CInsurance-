import React from 'react';

/**
 * @function PolicyForm
 * @description Component to display the policy purchase form.
 * @param {function} purchasePolicy - Function to call when purchasing a policy.
 */
function PolicyForm({ purchasePolicy }) {
  return (
    <div>
      <h2>Purchase Policy</h2>
      {/* Button to purchase a policy */}
      <button onClick={purchasePolicy}>Buy Policy for 0.1 ETH</button>
    </div>
  );
}

export default PolicyForm;

