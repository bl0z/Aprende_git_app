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
  parameter1 = parameter1 || "";
  parameter2 = parameter2 || "";
  parameter3 = parameter3 || "";
  parameter4 = parameter4 || "";
  if (window[command]) {
    return window[command](parameter1, parameter2, parameter3, parameter4);
  } else {
    return command + ": command not found";
  }
}

files = {
  "root": {
    "readme.txt": "-Proyecto realizado por Jose Tirado para el IES El Majuelo.",
  }
}

var step = 1;
var currentBranch = "master";
var doCommit = false;

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
    return "cat: " + filename + " : Is a directory";

  }
  if (currentFolder[filename] == "") {
    return "";
  }
  if (currentFolder[filename]) {
    return currentFolder[filename];
  } else {
    return "cat: " + filename + " : No such file or directory";
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

  switch(mod) {
    case "init":
      if(window.location.href.substring(46) == "1" || window.location.href.substring(46) == "") {
        redireccionar();
        return "Initialized empty Git repository in /.git/<br />";
      }
      break;
    case "status":
      if(window.location.href.substring(46) < 2) {
        return "fatal: Not a git repository (or any of the parent directories): .git<br />"
      } else if(window.location.href.substring(46) == 2 || window.location.href.substring(46) == 3) {
        redireccionar();
        if(doCommit == false){
          var return_string = "On branch "+currentBranch+"<br />nothing to commit (create/copy files and use 'git add' to track)<br />";
          doCommit = true;
        } else {
          var return_string = "On branch "+currentBranch+"<br />Untracked files:<br />&nbsp;&nbsp;(use 'git add <file>...' to include in what will be committed)<br /><br /><p class='text-red'>miFichero.txt</p><br />no changes added to commit (use 'git add' and/or 'git commit -a')<br />";
        }
        return return_string;
      }
      break;
    case "add":
      if(window.location.href.substring(46) == 4) {
        if(mod2 == "miFichero.txt" || mod2 == "*") {
          redireccionar();
          mkdir(mod2);
          return "";
        } else {
          return "fatal: pathspec 'octodog.txt' did not match any files<br />";
        }
      } else {
        
      }
    default:
      break;
  }
}



  // if(mod2 == "-r")
  //   return document.location.href='http://localhost/terminal_project/index.html#/26';
  // redireccionar();
  // return window.location.href;

function redireccionar() {
  step++;
  document.location.href='http://localhost/terminal_project/index.html#/'+step;
}

/* END GIT EVENTS */

$('.panel').stop().animate({
  scrollTop: $(".panel")[0].scrollHeight
}, 200);