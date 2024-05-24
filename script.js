//your JS code here. If required.
document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output");

  // Add a row that spans 2 columns with the text "Loading..."
  const loadingRow = document.createElement("tr");
  const loadingCell = document.createElement("td");
  loadingCell.colSpan = 2;
  loadingCell.textContent = "Loading...";
  loadingRow.appendChild(loadingCell);
  output.appendChild(loadingRow);

  // Function to create a promise that resolves after a random time between 1 and 3 seconds
  const createPromise = (index) => {
    const time = (Math.random() * 2 + 1).toFixed(3); // Random time between 1 and 3 seconds
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ index, time });
      }, time * 1000);
    });
  };

  // Create an array of three promises
  const promises = [createPromise(1), createPromise(2), createPromise(3)];

  // Record the start time
  const startTime = performance.now();

  // Use Promise.all to wait for all promises to resolve
  Promise.all(promises).then((results) => {
    // Calculate the total time taken to resolve all promises
    const totalTime = ((performance.now() - startTime) / 1000).toFixed(3);

    // Remove the loading text
    output.innerHTML = "";

    // Populate the table with the results
    results.forEach((result) => {
      const row = document.createElement("tr");

      const nameCell = document.createElement("td");
      nameCell.textContent = `Promise ${result.index}`;

      const timeCell = document.createElement("td");
      timeCell.textContent = result.time;

      row.appendChild(nameCell);
      row.appendChild(timeCell);

      output.appendChild(row);
    });

    // Add the total time row
    const totalRow = document.createElement("tr");

    const totalNameCell = document.createElement("td");
    totalNameCell.textContent = "Total";

    const totalTimeCell = document.createElement("td");
    totalTimeCell.textContent = totalTime;

    totalRow.appendChild(totalNameCell);
    totalRow.appendChild(totalTimeCell);

    output.appendChild(totalRow);
  });
});