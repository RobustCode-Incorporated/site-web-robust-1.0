(function () {
  const STORAGE_KEY = "rc-project-checklist";
  const root = document.getElementById("checklist-root");
  if (!root) return;

  let state = {};
  try {
    state = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch (e) {
    state = {};
  }

  const boxes = root.querySelectorAll("input[type=checkbox]");
  boxes.forEach((box) => {
    const id = box.dataset.checklistId;
    box.checked = Boolean(state[id]);
  });

  let started = false;
  root.addEventListener("change", (e) => {
    const box = e.target;
    if (box.type !== "checkbox") return;
    state[box.dataset.checklistId] = box.checked;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      // localStorage unavailable (private mode, etc.) — checklist still works, just doesn't persist
    }
    if (!started && typeof window.va === "function") {
      started = true;
      window.va("event", { name: "tool_start", data: { tool: "project-success-checklist" } });
    }
    const total = boxes.length;
    const checked = Array.from(boxes).filter((b) => b.checked).length;
    if (checked === total && typeof window.va === "function") {
      window.va("event", { name: "tool_complete", data: { tool: "project-success-checklist" } });
    }
  });
})();
