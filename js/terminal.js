$(".panel").on('keypress', ".in", function(e) {
  if (e.which == 13) {
    $(this).prop('readonly', true);
    var input = $(this).val().split(" ");
    // if (input[1]) {
      var output = execute(input[0], input[1], input[2], input[3], input[4]);
    // } else {
    //   var output = execute(input[0], "");
    // }
    $(".output").last().html(output)
    $(".panel").append($("<div class='action'>").html("<div class='action'><div class='command'><span class='symbol'>$</span><input class='in' type='text'></div><div class='output'></div></div>"));
    $(".in").last().focus();
  }
});

function execute(command, parameter1, parameter2, parameter3, parameter4) {
  console.log(command, parameter1, parameter2, parameter3, parameter4);
  parameter1 = parameter1 || ""
  parameter2 = parameter2 || ""
  parameter3 = parameter3 || ""
  parameter4 = parameter4 || ""
  if (window[command]) {
    return window[command](parameter1, parameter2, parameter3, parameter4);
  } else {
    return command + ": command not found";
  }
}

files = {
  "root": {
    "aboutme.txt": "-Get new shell, -Buy Milk",
    "passwords.txt": "gmail: p@ssword, reddit: hunter2",
    "projects": {
      "bio.txt": "cells organisms",
      "chem.txt": "ions protons"
    }
  }
}

var test = 1
var currentBranch = "Master"

var upperFolder = null;
var currentFolder = files["root"];
var path = [];


/* TERMINAL EVENTS */
function ls() {
  var keys = [];
  for (var key in currentFolder) {
    if (currentFolder.hasOwnProperty(key)) { //to be safe
      keys.push(key);
    }
  }
  return keys.join(" ");
}

function cat(filename) {
  if (filename == "") {
    return "usage: cat file ...";
  }
  if (typeof currentFolder[filename] == "object") {
    return "cat: " + filename + " : Is a directory"

  }
  if (currentFolder[filename] == "") {
    return "";
  }
  if (currentFolder[filename]) {
    return currentFolder[filename];
  } else {
    return "cat: " + filename + " : No such file or directory"
  }
}

function cd(folder) {
  if (folder == "") {
    return "";
  }
  if (folder == "..") {
    if (path.length > 0) {
      currentFolder = upperFolder;
      path.pop();
    }
  } else if (typeof currentFolder[folder] == "object") {
    upperFolder = currentFolder;
    currentFolder = currentFolder[folder];
    path.push(folder);
  } else {
    return "cd: " + folder + ": No such file or directory";
  }
}

function mkdir(folderName) {
  if (folderName != "") {
    currentFolder[folderName] = {};
    return "";
  } else {
    return "usage: mkdir directory ...";
  }
}

function touch(fileName) {
  currentFolder[fileName] = "";
}

function echo(string) {
  return string;
}

function rm(name) {
  delete currentFolder[name]
}

function help() {
  return "Commands: ls, cd, mkdir, echo, touch, rm, cat, pwd, help";
}

function pwd() {
  if (path.length == 0) {
    return "/"
  }
  return "/" + path.join("/")
}

/* END TERMINAL EVENTS */
/* GIT EVENTS */
function git(mod, mod2, mod3, mod4) {
  mod = mod || "";
  mod2 = mod2 || "";
  mod3 = mod3 || "";
  mod4 = mod4 || "";
  if(mod2 == "-r")
    return document.location.href='http://localhost/terminal_project/index.html#/26';
  redireccionar();
  return window.location.href;
}

function redireccionar() {
  test++;
  document.location.href='http://localhost/terminal_project/index.html#/'+test;
}

/* END GIT EVENTS */

$('.panel').stop().animate({
  scrollTop: $(".panel")[0].scrollHeight
}, 200);