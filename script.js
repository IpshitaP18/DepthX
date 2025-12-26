const quizDatabase = {
  "Arrays": [
    { q: "Time complexity for index-based access?", options: ["O(n)", "O(1)", "O(log n)"], correct: 1 },
    { q: "Why do arrays require contiguous memory?", options: ["To calculate addresses via offset", "To save space", "To allow recursion"], correct: 0 },
    { q: "Time complexity of inserting at index 0?", options: ["O(1)", "O(n)", "O(log n)"], correct: 1 },
    { q: "What happens when a Dynamic Array is full?", options: ["Allocates larger block & copies", "Crashes", "Deletes old data"], correct: 0 },
    { q: "Best search complexity in a sorted array?", options: ["O(n)", "O(log n)", "O(n^2)"], correct: 1 },
    { q: "Arrays benefit CPU performance via:", options: ["Spatial Locality", "Randomization", "Pointers"], correct: 0 },
    { q: "Deleting a middle element requires:", options: ["Nothing", "Shifting elements", "Rebooting"], correct: 1 },
    { q: "A 2D array is mapped to memory as:", options: ["A Tree", "A Linear 1D block", "A Hash Map"], correct: 1 }
  ],
  "Linked Lists": [
    { q: "Components of a Singly Linked Node?", options: ["Data & Index", "Data & Next Pointer", "Value & ID"], correct: 1 },
    { q: "Why is Random Access O(n) here?", options: ["Must traverse from head", "Memory is contiguous", "Data is encrypted"], correct: 0 },
    { q: "Primary advantage of Linked Lists?", options: ["Faster access", "Dynamic size allocation", "Less memory use"], correct: 1 },
    { q: "Insertion at the HEAD complexity?", options: ["O(1)", "O(n)", "O(log n)"], correct: 0 },
    { q: "Why more memory overhead than arrays?", options: ["Storage of pointers", "Larger data types", "Fragmented blocks"], correct: 0 },
    { q: "What is gained in a Doubly Linked List?", options: ["Less memory", "Bidirectional traversal", "O(1) search"], correct: 1 },
    { q: "Last node pointing to head creates a:", options: ["Stack Overflow", "Circular Linked List", "Deadlock"], correct: 1 },
    { q: "Singly Linked List deletion requires:", options: ["The predecessor node", "An index", "A full list scan"], correct: 0 }
  ]
};

function selectTopic(t) { localStorage.setItem("topic", t); window.location.href = "quiz.html"; }

function loadQuiz() {
  const topic = localStorage.getItem("topic") || "Arrays";
  const questions = quizDatabase[topic];
  const container = document.getElementById("questionContainer");
  if(document.getElementById("topicTitle")) document.getElementById("topicTitle").innerText = topic + " Assessment";
  
  if(container) {
    container.innerHTML = questions.map((item, idx) => `
      <div class="card mb-4">
        <p><strong>${idx + 1}. ${item.q}</strong></p>
        ${item.options.map((opt, i) => `
          <label class="option-label"><input type="radio" name="q${idx}" value="${i === item.correct ? 1 : 0}"> ${opt}</label>
        `).join('')}
      </div>
    `).join('');
  }
}

function submitQuiz() {
  const topic = localStorage.getItem("topic");
  const questions = quizDatabase[topic];
  let score = 0;
  questions.forEach((_, i) => {
    let sel = document.querySelector(`input[name="q${i}"]:checked`);
    if (sel) score += Number(sel.value);
  });
  localStorage.setItem("score", score);
  localStorage.setItem("total", questions.length);
  window.location.href = "result.html";
}

function generateReport() {
  const score = Number(localStorage.getItem("score")) || 0;
  const total = Number(localStorage.getItem("total")) || 8;
  const topic = localStorage.getItem("topic") || "Topic";
  const accuracy = (score / total) * 100;
  
  const progressBar = document.getElementById("progressBarFill");
  if (!progressBar) return;

  document.getElementById("topicSubtitle").innerText = `Detailed Report for: ${topic}`;
  document.getElementById("accuracyLabel").innerText = `${score}/${total}`;
  setTimeout(() => { progressBar.style.width = accuracy + "%"; }, 200);

  const isWeak = accuracy < 60;
  const inference = document.getElementById("accuracyInference");
  const sList = document.getElementById("strengthsList");
  const wList = document.getElementById("weaknessesList");
  const aPlan = document.getElementById("actionPlan");

  if (isWeak) {
    inference.innerHTML = `Current understanding is <span style="color:#ef4444; font-weight:bold;">Weak</span>. High Conceptual Debt detected.`;
    sList.innerHTML = `<span class="badge badge-secondary">Attempted Analysis</span>`;
    wList.innerHTML = `<span class="badge badge-destructive">${topic} Basics</span><span class="badge badge-destructive">Complexity Intuition</span>`;
    aPlan.innerHTML = `<li>Revise core memory models of ${topic}.</li><li>Dry-run algorithms on paper.</li><li>Aim for 80%+ accuracy.</li>`;
  } else {
    inference.innerHTML = `Current understanding is <span style="color:#22c55e; font-weight:bold;">Strong</span>. Foundation is solid.`;
    sList.innerHTML = `<span class="badge badge-secondary">${topic} Operations</span><span class="badge badge-secondary">Time Complexity</span>`;
    wList.innerHTML = `<span class="badge badge-destructive">Advanced Edge Cases</span>`;
    aPlan.innerHTML = `<li>Build a custom ${topic} library.</li><li>Solve 5 LeetCode 'Medium' problems using ${topic}.</li><li>Progress to Stacks/Queues.</li>`;
  }
}

window.onload = () => {
  if (document.getElementById("questionContainer")) loadQuiz();
  if (document.getElementById("progressBarFill")) generateReport();
};

function goHome() { window.location.href = "index.html"; }