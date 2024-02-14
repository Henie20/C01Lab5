//Helper functions
async function removeAllNotes () {
  // remove any exisiting notes
  await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
  });
}

async function addNote () {
  // Add a note
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  
  });

  const Res1 = await fetch(`${SERVER_URL}/getAllNotes`, {
    method: "GET",
  });

  const Body1 = await Res1.json();
  return Object.values(Body1.response)[0]._id
}



test("1+2=3, empty array is empty", () => {
    expect(1 + 2).toBe(3);
    expect([].length).toBe(0);
  });

  const SERVER_URL = "http://localhost:4000";

test("/postNote - Post a note", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      content: content,
    }),
  });

  const postNoteBody = await postNoteRes.json();

  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
});

test("/getAllNotes - Return list of zero notes for getAllNotes", async () => {
  await removeAllNotes();

  const Res = await fetch(`${SERVER_URL}/getAllNotes`, {
    method: "GET",
  });

  const Body = await Res.json();

  expect(Res.status).toBe(200);
  expect(Body.response).toStrictEqual([]);
});

test("/getAllNotes - Return list of two notes for getAllNotes", async () => {

  await removeAllNotes()
  await addNote()
  await addNote()
  
  const Res = await fetch(`${SERVER_URL}/getAllNotes`, {
    method: "GET",
  });

  const Body = await Res.json();

  expect(Res.status).toBe(200);
  expect(Object.keys(Body.response).length).toBe(2);
});

test("/deleteNote - Delete a note", async () => {
  await removeAllNotes()
  noteId = await addNote()

  const Res = await fetch(`${SERVER_URL}/deleteNote/${noteId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
  });

  const Body = await Res.json();

  expect(Res.status).toBe(200);
  expect(Body.response).toBe(`Document with ID ${noteId} deleted.`);
});

test("/patchNote - Patch with content and title", async () => {
  await removeAllNotes()
  noteId = await addNote()

  const Res = await fetch(`${SERVER_URL}/patchNote/${noteId}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({title: "new title", content: "new content"})
  });

  const Body = await Res.json();

  expect(Res.status).toBe(200);
  expect(Body.response).toBe(`Document with ID ${noteId} patched.`);
  
});

test("/patchNote - Patch with just title", async () => {
  await removeAllNotes()
  noteId = await addNote()

  const Res = await fetch(`${SERVER_URL}/patchNote/${noteId}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({title: "new title"})
  });

  const Body = await Res.json();

  expect(Res.status).toBe(200);
  expect(Body.response).toBe(`Document with ID ${noteId} patched.`);
});

test("/patchNote - Patch with just content", async () => {
  await removeAllNotes()
  noteId = await addNote()

  const Res = await fetch(`${SERVER_URL}/patchNote/${noteId}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({content: "new content"})
  });

  const Body = await Res.json();

  expect(Res.status).toBe(200);
  expect(Body.response).toBe(`Document with ID ${noteId} patched.`);
});

test("/deleteAllNotes - Delete one note", async () => {
  const Res1 = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
  });

  expect(Res1.status).toBe(200)

  await addNote();

  const Res = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
  });

  const Body = await Res.json();

  expect(Res.status).toBe(200);
  expect(Body.response).toBe(`1 note(s) deleted.`);
});

test("/deleteAllNotes - Delete three notes", async () => {
  await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
  });

  await addNote()
  await addNote()
  await addNote()

  const Res = await fetch(`${SERVER_URL}/deleteAllNotes`, {
    method: "DELETE",
  });

  const Body = await Res.json();

  expect(Res.status).toBe(200);
  expect(Body.response).toBe(`3 note(s) deleted.`);
});

test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
  await removeAllNotes()
  noteId = await addNote()

  const color = "#FF0000"
  const Res = await fetch(`${SERVER_URL}/updateNoteColor/${noteId}`, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ color }),
  });

  const Body = await Res.json();

  expect(Res.status).toBe(200);
  expect(Body.message).toBe(`Note color updated successfully.`);
});