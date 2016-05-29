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


files = { "root": { "readme.txt": "-Proyecto realizado por Jose Tirado para el IES El Majuelo.", } };
// commits = ["initial version", "15a3a697f872c51f4ec344554993eee8bcbe52ab", "Sat May 28 2016 15:30:00 GMT+0200 (CEST)"];
commits = [];
commit_codes = [];
var step = 1;
var pullOn = false;
var pushOn = false;
var currentBranch = "master";
var remoteBranch = "";
var upperFolder = null;
var currentFolder = files["root"];
var path = [];


function execute(command, parameter1, parameter2, parameter3, parameter4) {
  // console.log(command, parameter1, parameter2, parameter3, parameter4);
  parameter1 = parameter1 || "";
  parameter2 = parameter2 || "";
  parameter3 = parameter3 || "";
  parameter4 = parameter4 || "";
  if(command != "cd" || command != "mkdir" || command != "touch" || command != "rm" || command != "pwd")
    if(window[command]) 
      return window[command](parameter1, parameter2, parameter3, parameter4);
  return command + ": command not found";
}

/* TERMINAL EVENTS */
function ls() {
  var keys = [];
  for (var key in currentFolder) {
    if (currentFolder.hasOwnProperty(key))
      keys.push(key);
  }
  return keys.join(" ");
}
function cat(filename) {
  if (filename == "")
    return "usage: cat file ...";
  else if (typeof currentFolder[filename] == "object")
    return "cat: " + filename + " : Is a directory";
  else if (currentFolder[filename] == "")
    return "";
  else if (currentFolder[filename])
    return currentFolder[filename];
  else
    return "cat: " + filename + " : No such file or directory";
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
  } else
    return "cd: " + folder + ": No such file or directory";
}
function mkdir(folderName) {
  if (folderName != "") {
    currentFolder[folderName] = {};
    return "";
  } else
    return "usage: mkdir directory ...";
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
  if (path.length == 0)
    return "/";
  return "/" + path.join("/");
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
      if(window.location.href.slice(-2) == 1) {
        nextStep();
        return "Initialized empty Git repository in /.git/<br />";
      } else
        return "Reinitialized existing Git repository in /.git/";
    case "status":
      if(window.location.href.slice(-2) == 1)
        return "fatal: Not a git repository (or any of the parent directories): .git"
      else if(window.location.href.slice(-2) == 2) {
        nextStep();
        return "On branch "+currentBranch+"<br />nothing to commit (create/copy files and use 'git add' to track)";
      } else if (window.location.href.slice(-2) <= 4) {
        nextStep();
        return "On branch "+currentBranch+"<br />Untracked files:<br />&nbsp;&nbsp;(use 'git add <file>...' to include in what will be committed)<br /><p class='text-red'>test</p>no changes added to commit (use 'git add' and/or 'git commit -a')";
      } else if (window.location.href.slice(-2) == 5) {
        nextStep();
        return "On branch "+currentBranch+"<br />Changes to be committed:<br /><p class='text-green'>modified:&nbsp;&nbsp;&nbsp;miFichero.txt</p>";
      }
      break;
    case "add":
      if(window.location.href.slice(-2) == 4) {
        if (mod2.substring(0, 1) == '"' && mod2.slice(-1) == '"' || mod2.substring(0, 1) == "'" && mod2.slice(-1) == '"')
          mod2 = mod2.substring(1, mod2.length-1);
        else
          return "Use quote marks to envolve the filename";
        if(mod2 == "holamundo.txt" || mod2 == "*") {
          nextStep();
          add_file("holamundo.txt", "Hola mundo!");
          return "";
        } else
          return "fatal: pathspec "+mod2.substring(1, mod2.length-1)+" did not match any files";
      } else if(window.location.href.slice(-2) == 7) {
        if(mod2 == "*.txt" || mod2 == "*") {
          nextStep();
          add_file("fichero1.txt", "Este es el primer fichero.");
          add_file("fichero2.txt", "Este es el segundo fichero.");
          add_file("fichero3.txt", "Este es el tercero fichero.");
          add_file("fichero4.txt", "Este es el cuarto fichero.");
          return "";
        } else
          return "fatal: pathspec " + mod2 + " did not match any files";
      }
      return "";
    case "commit":
      if (mod3.substring(0, 1) == '"' && mod3.slice(-1) == '"' || mod3.substring(0, 1) == "'" && mod3.slice(-1) == '"')
        mod3 = mod3.substring(1, mod3.length-1);
      else
        return "Use quote marks to envolve the comment of the commit";
      if (mod2 == "-m")
        return mod2 + ": subcommand not found";
      if (mod3 == "")
        return "missing comment";
      if(window.location.href.slice(-2) == 6) {
        nextStep();
        // Generates a 40 digit Key in Hexadecimal
        var key = (function key(gen){ return (gen += [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random()*16)]) && (gen.length == 40) ?  gen : key(gen); })('');
        add_commit(mod3, key);
        return "[" + currentBranch + " " + key.substring(0, 7) + "]<br />&nbsp;1 file changed, 1 insertion(+)<br />&nbsp;create mode 100644 fichero1.txt";
      } else if(window.location.href.slice(-2) == 8) {
        nextStep();
        // Generates a 40 digit Key in Hexadecimal
        var key = (function key(gen){ return (gen += [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random()*16)]) && (gen.length == 40) ?  gen : key(gen); })('');
        add_commit(mod3, key);
        return "[" + currentBranch + " " + key.substring(0, 7) + "]<br />&nbsp;4 files changed, 4 insertions(+)<br />&nbsp;create mode 100644 fichero1.txt<br />&nbsp;create mode 100644 fichero2.txt<br />&nbsp;create mode 100644 fichero3.txt<br />&nbsp;create mode 100644 fichero4.txt";
      }
      return "On branch " + currentBranch + "<br />no changes added to commit";
    case "log":
      if(window.location.href.slice(-2) == 9)
        nextStep();
      return show_log();
    case "remote":
      if(window.location.href.slice(-2) == 10) {
        if(mod2 == "add") {
          if(mod3 != "") {
            if(mod4 == "http://www.github.com/test/test.git") {
              nextStep();
              remoteBranch = mod3;
            } else
              return "This repository does not exist";
          } else
            return "Local repository must be named"
        } else
          return mod2 + ": subcommand not found"
      }
      return "";
    case "pull": /* COMPROBAR en LIVE */
      if(mod2 == remoteBranch) {
        if(mod3 == currentBranch) {
          if(window.location.href.slice(-2) == 11) {
            nextStep();
            pullOn = true;
            return "Updating<br /> Fast-forward<br />&nbsp;fichero5.txt&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;1&nbsp;&nbsp;<color='green'>+</span><br />&nbsp;1 file changed, 1 insertion(+)<br />&nbsp;create mode 100644 fichero5.txt"; 
          } else
            return "From https://github.com/test/test.git<br /> * branch            master     -> FETCH_HEAD<br />Already up-to-date";
        } else
          return "fatal: Couldn't find remote ref " + mod3;
      } else
        return "fatal: '" + mod2 + "' does not appear to be a git repository<br />fatal: Could not read from remote repository.<br />Please make sure you have the correct access rights and the repository exists";
    case "push": /* COMPROBAR en LIVE */
      if(mod2 == "-u") {
        if(mod3 == remoteBranch) {
          if(mod4 == currentBranch) {
            if(window.location.href.slice(-2) == 12) {
              nextStep();
              pushOn = true;
              return "branch " + currentBranch + " set up to track remote branch " + currentBranch + " from " + remoteBranch; 
            } else {
              if(pullOn == true)
                return "To https://github.com/test/test.git <br />" + commits[commits.length-1].substring(0, 7) + ".." + commits[commits.length-1].slice(-7) + "&nbsp;&nbsp;" + currentBranch + " -&gt; " + currentBranch;
              else
                return "To https://github.com/test/test.git<br /> ! [rejected]        master -> master (non-fast-forward)<br />error: failed to push some refs to 'https://github.com/test/test.git'<br />hint: Updates were rejected because the tip of your current branch is behind<br />hint: its remote counterpart. Merge the remote changes (e.g. 'git pull')<br />hint: before pushing again";
            } 
          } else
            return "error: src refspec " + mod4 + " does not match any.<br />error: failed to push some refs to 'https://github.com/test/test.git'";
            }
        } else
          return "fatal: '" + mod3 + "' does not appear to be a git repository<br />fatal: Could not read from remote repository.<br />Please make sure you have the correct access rights and the repository exists";
      } else if (mod2 == "" && pushOn == true)
        return "To https://github.com/test/test.git <br />" + commits[commits.length-1].substring(0, 7) + ".." + commits[commits.length-1].slice(-7) + "&nbsp;&nbsp;" + currentBranch + " -&gt; " + currentBranch;
      } else {
        return mod2 + ": subcommand not found";
      }
    case "rm": /*COMPROBAR en LIVE */
      if(window.location.href.slice(-2) == 12)
        nextStep();
      rm(mod2);
      return "rm applied";
    default:
      break;
  }
}
function show_log() {
  var log_string = "";
  for(i = 0; i < commits.length; i += 3) {
    log_string += ("<p class='text-yellow'>commit "+commits[i+1]+"</p>Author:&nbsp;You &lt;your@email.com&gt;<br />Date:&nbsp;&nbsp;&nbsp;&nbsp;"+commits[i+2]+"<br /><p style='padding-left:30px'>"+commits[i]+"</p>");
  }
  return log_string;
}
function add_file(filename, filecontent) {
  currentFolder[filename] = filecontent;
}
function add_commit(msg, key) {
  commits.push(msg);
  commits.push(key);
  commits.push(new Date());
}
function add_commit_code(key) {
  commit_codes.push(key);
}
function nextStep() {
  step++;
  document.location.href=document.location.href.substring(0, document.location.href.length-2)+("0" + step).slice(-2);
}

/* END GIT EVENTS */

$('.panel').stop().animate({
  scrollTop: $(".panel")[0].scrollHeight
}, 200);