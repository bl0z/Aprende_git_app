/**
  * Project Name: Aprende a usar Git (http://github.com/bl0z/Aprende_git_app.git)
  * Filename: terminal.js
  * Author: Jose Tirado;
  * Licensed under MIT (https://github.com/bl0z/Aprende_git_app/LICENSE)
  * This file contains all script for the tutorials' terminal
  */

/**
  * Check if the key pressed is ENTER
  * If ENTER is pressed, split the string of the input and calls execute with the array as params
  * Params: e (Key pressed)
*/
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
}); // end function()


files = { "root": { "readme.txt": "-Proyecto realizado por Jose Tirado para el IES El Majuelo.", } };
commits = ["initial version", "15a3a697f872c51f4ec344554993eee8bcbe52ab", new Date()];
//commits = [];
commit_codes = [];
var step = 1;
var pullOn = false;
var pushOn = false;
var currentBranch = "master";
var remoteBranch = "";
var upperFolder = null;
var currentFolder = files["root"];
var path = [];

/**
  * This funcion check the input string and calls the correct function for the command
  * Params: command and 4 optional modifiers
  * Return: a string that will be shown in the terminal with the result of the command
*/
function execute(command, parameter1, parameter2, parameter3, parameter4) {
  // console.log(command, parameter1, parameter2, parameter3, parameter4);
  parameter1 = parameter1 || "";
  parameter2 = parameter2 || "";
  parameter3 = parameter3 || "";
  parameter4 = parameter4 || "";
  if(command != "cd" && command != "mkdir" && command != "touch" && command != "rm" && command != "pwd")
    if(window[command]) 
      return window[command](parameter1, parameter2, parameter3, parameter4);
  return command + ": command not found";
} // end execute()


/* TERMINAL EVENTS */
/**
  * Show currently files
*/
function ls() {
  var keys = [];
  for (var key in currentFolder) {
    if (currentFolder.hasOwnProperty(key))
      keys.push(key);
  }
  return keys.join(" ");
} // end ls()


/**
  * Check if it is a directory or file or not. If it is a folder, shows a default message. If it is a file, shows the content of the file. If not, shows a default message
  * Params: the filename that should be checked
  * Return: a string that will be shown in the terminal with the result of the command
*/
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
} // end cat()


/**
  * Private function that allows you to move for the tree folder
  * Params: the folder target
  * Return: a string that will be shown in the terminal with the result of the command
*/
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
} // end cd()


/**
  * Private function that allows you to create a new directory in your current folder
  * Params: the filename that should be checked
  * Return: a string that will be shown in the terminal with the result of the command
*/
function mkdir(folderName) {
  if (folderName != "") {
    currentFolder[folderName] = {};
    return "";
  } else
    return "usage: mkdir directory ...";
} // end mkdir()


function touch(fileName) {
  currentFolder[fileName] = "";
} // end touch()


/**
  * Function that return the param
  * Params: a string
  * Return: param will be shown in the terminal
*/
function echo(string) {
  return string;
} // end echo()


/**
  * Private function that delete files in your current folder
  * Params: the filename that should be deleted
*/
function rm(name) {
  if (name == '*' || name == "\'*\'" || name == '\"*\"')
    currentFolder = [];
  delete currentFolder[name]
} // end rm()


/**
  * Show which commands are available by user
  * Return: a string that contains every command available by user that will be shown in the terminal
*/
function help() {
  return "Commands: ls, echo, cat, help";
} // end help()


/**
  * Private function that shows your current folder
  * Return: a string that contains your current folder that will be shown in the terminal
*/
function pwd() {
  if (path.length == 0)
    return "/";
  return "/" + path.join("/");
} // end pwd()


/* END TERMINAL EVENTS */


/* GIT EVENTS */
/**
  * The Git command function that check every parameter and do something in the right way
  * Params: optional parameters for every git command
  * Return: a string that will be shown in the terminal with the result of the command
*/
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
      switch(window.location.href.slice(-2)) {
        case "01":
          return "fatal: Not a git repository (or any of the parent directories): .git"; break;
        case "03":
        case "04":
          nextStep();
          return "On branch " + currentBranch + "<br />Untracked files:<br />&nbsp;&nbsp;(use 'git add <file>...' to include in what will be committed)<br /><p class='text-red'>holamundo.txt</p>no changes added to commit (use 'git add' and/or 'git commit -a')";
        case "05":
        case "06":
          nextStep();
          return "On branch " + currentBranch + "<br />Changes to be committed:<br /><p class='text-green'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;new file:&nbsp;&nbsp;holamundo.txt</p>";
        case "07":
          return "On branch " + currentBranch + "<br />Untracked files:<br />&nbsp;&nbsp;(use 'git add <file>...' to include in what will be committed)<br /><p class='text-red'>fichero1.txt<br />fichero2.txt<br />fichero3.txt<br />fichero4.txt</p>no changes added to commit (use 'git add' and/or 'git commit -a')";
        case "08":
          return "On branch " + currentBranch + "<br />Changes to be committed:<br /><p class='text-green'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;new file:&nbsp;&nbsp;fichero1.txt<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;new file:&nbsp;&nbsp;fichero2.txt<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;new file:&nbsp;&nbsp;fichero3.txt<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;new file:&nbsp;&nbsp;fichero4.txt</p>";
        case "13":
          return "On branch " + currentBranch + "<br />&nbsp;Changes not staged for commit:<br />&nbsp;&nbsp;&nbsp;(use 'git add <file>...' to update what will be committed)<br />&nbsp;&nbsp;&nbsp;(use 'git checkout -- <file>...' to discard changes in working directory)<br /><p class='text-red'>&nbsp;&nbsp;&nbsp;&nbsp;modified:&nbsp;&nbsp;&nbsp;fichero5.txt</p><br />no changes added to commit (use 'git add' and/or 'git commit -a')";
        case "14":
          return "On branch " + currentBranch + "<br />Changes to be committed: <br />&nbsp;&nbsp;(use 'git reset HEAD <file>...' to unstage) <br /><p class='text-green'>&nbsp;&nbsp;&nbsp;&nbsp;deleted:&nbsp;&nbsp;&nbsp;fichero1.html <br />&nbsp;&nbsp;&nbsp;&nbsp;deleted:&nbsp;&nbsp;&nbsp;fichero2.html <br />&nbsp;&nbsp;&nbsp;&nbsp;deleted:&nbsp;&nbsp;&nbsp;fichero3.html <br />&nbsp;&nbsp;&nbsp;&nbsp;deleted:&nbsp;&nbsp;&nbsp;fichero4.html <br />&nbsp;&nbsp;&nbsp;&nbsp;deleted:&nbsp;&nbsp;&nbsp;fichero5.html</p>";
        case "02":
          nextStep();
        default:
          return "On branch "+currentBranch+"<br />nothing to commit (create/copy files and use 'git add' to track)";
      }
    case "add":
      if (mod2.substring(0, 1) == '\"' && mod2.slice(-1) == '\"' || mod2.substring(0, 1) == "\'" && mod2.slice(-1) == '\'')
        mod2 = mod2.substring(1, mod2.length-1);
      else if (mod2 == "*")
        /* DO NOTHING */;
      else
        return "Use quote marks to envolve the filename";
      if (window.location.href.slice(-2) == 1)
         return "fatal: Not a git repository (or any of the parent directories): .git";
      else if(window.location.href.slice(-2) == 4) {
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
      if (mod3.substring(0, 1) == '"' && mod3.slice(-1) == '"' || mod3.substring(0, 1) == "'" && mod3.slice(-1) == "'")
        mod3 = mod3.substring(1, mod3.length-1);
      else
        return "Use quote marks to envolve the comment of the commit";
      if (mod2 != "-m")
        return mod2 + ": subcommand not found";
      if (mod3 == "")
        return "missing comment";
      if (window.location.href.slice(-2) == 1)
         return "fatal: Not a git repository (or any of the parent directories): .git";
      else if(window.location.href.slice(-2) == 6) {
        nextStep();
        // Generates a 40 digit Key in Hexadecimal
        var key = (function key(gen){ return (gen += [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random()*16)]) && (gen.length == 40) ?  gen : key(gen); })('');
        add_commit(mod3, key);
        return "[" + currentBranch + " " + key.substring(0, 7) + "] " + commits[commits.length-3] + "<br />&nbsp;1 file changed, 1 insertion(+)<br />&nbsp;create mode 100644 fichero1.txt";
      } else if(window.location.href.slice(-2) == 8) {
        nextStep();
        // Generates a 40 digit Key in Hexadecimal
        var key = (function key(gen){ return (gen += [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random()*16)]) && (gen.length == 40) ?  gen : key(gen); })('');
        add_commit(mod3, key);
        return "[" + currentBranch + " " + key.substring(0, 7) + "] " + commits[commits.length-3] + "<br />&nbsp;4 files changed, 4 insertions(+)<br />&nbsp;create mode 100644 fichero1.txt<br />&nbsp;create mode 100644 fichero2.txt<br />&nbsp;create mode 100644 fichero3.txt<br />&nbsp;create mode 100644 fichero4.txt";
      } else if (window.location.href.slice(-2) == 14) {
        nextStep();
        // Generates a 40 digit Key in Hexadecimal
        var key = (function key(gen){ return (gen += [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random()*16)]) && (gen.length == 40) ?  gen : key(gen); })('');
        add_commit(mod3, key);
        return "[" + currentBranch + " " + key.substring(0, 7) + "] " + commits[commits.length-3] + "<br />&nbsp;5 files changed, 5 deletions(+)<br />&nbsp;delete mode 100644 fichero1.txt<br />&nbsp;delete mode 100644 fichero2.txt<br />&nbsp;delete mode 100644 fichero3.txt<br />&nbsp;delete mode 100644 fichero4.txt<br />&nbsp;delete mode 100644 fichero5.txt";
      }
      return "On branch " + currentBranch + "<br />no changes added to commit";
    case "log":
      if (window.location.href.slice(-2) == 1)
         return "fatal: Not a git repository (or any of the parent directories): .git";
      else if(window.location.href.slice(-2) == 9)
        nextStep();
      return show_log();
    case "remote":
      if (window.location.href.slice(-2) == 1)
         return "fatal: Not a git repository (or any of the parent directories): .git";
      else if(window.location.href.slice(-2) == 10) {
        if(mod2 == "add") {
          if(mod3 != "") {
            if(mod4 == "https://www.github.com/test/test.git") {
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
    case "pull":
      if(mod2 == remoteBranch) {
        if(mod3 == currentBranch) {
          if (window.location.href.slice(-2) == 1)
            return "fatal: Not a git repository (or any of the parent directories): .git";
          else if(window.location.href.slice(-2) == 12) {
            nextStep();
            pullOn = true;
            add_file("fichero5.txt", "Este es el quinto fichero.");
            return "Updating<br /> Fast-forward<br />&nbsp;fichero5.txt&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;1&nbsp;&nbsp;<color='green'>+</span><br />&nbsp;1 file changed, 1 insertion(+)<br />&nbsp;create mode 100644 fichero5.txt"; 
          } else
            return "From https://www.github.com/test/test.git<br /> * branch            master     -> FETCH_HEAD<br />Already up-to-date";
        } else
          return "fatal: Couldn't find remote ref " + mod3;
      } else
        return "fatal: '" + mod2 + "' does not appear to be a git repository<br />fatal: Could not read from remote repository.<br />Please make sure you have the correct access rights and the repository exists";
    case "push":
      if(mod2 == "-u") {
        if(mod3 == remoteBranch) {
          if(mod4 == currentBranch) {
            if (window.location.href.slice(-2) == 1)
              return "fatal: Not a git repository (or any of the parent directories): .git";
            else if(window.location.href.slice(-2) == 11) {
              nextStep();
              pushOn = true;
              return "branch " + currentBranch + " set up to track remote branch " + currentBranch + " from " + remoteBranch; 
            } else {
              if(pullOn == true) {
                if(window.location.href.slice(-2) == 15)
                  nextStep();
                return "To https://www.github.com/test/test.git<br />" + commits[commits.length-2].substring(0, 7) + ".." + commits[commits.length-2].slice(-7) + "&nbsp;&nbsp;" + currentBranch + " -&gt; " + currentBranch;
              } else
                return "To https://www.github.com/test/test.git<br />! [rejected]        master -> master (non-fast-forward)<br />error: failed to push some refs to 'https://www.github.com/test/test.git'<br />hint: Updates were rejected because the tip of your current branch is behind its remote counterpart. Merge the remote changes (e.g. 'git pull') before pushing again";
            } 
          } else
            return "error: src refspec " + mod4 + " does not match any.<br />error: failed to push some refs to 'https://www.github.com/test/test.git'";
        } else
          return "fatal: '" + mod3 + "' does not appear to be a git repository<br />fatal: Could not read from remote repository.<br />Please make sure you have the correct access rights and the repository exists";
      } else if (mod2 == "" && pushOn == true) {
        if(window.location.href.slice(-2) == 15)
          nextStep();
        return "To https://www.github.com/test/test.git <br />" + commits[commits.length-2].substring(0, 7) + ".." + commits[commits.length-2].slice(-7) + "&nbsp;&nbsp;" + currentBranch + " -&gt; " + currentBranch;
      } else
        return "You must use 'git push -u &lt;remote repository&gt;&lt;branch&gt;' once before use 'git push'";
    case "rm":
      if (window.location.href.slice(-2) == 1)
        return "fatal: Not a git repository (or any of the parent directories): .git";
      else if(window.location.href.slice(-2) == 13) {
        nextStep();
        rm(mod2);
        return "Some files are removed";
      } else
        return mod2 + ": command can not be used now";
    default:
      return mod + ": command not found";
  }
} // end git()


/**
  * Shows the current git log
  * Return: a string that will be shown in the terminal with the result of the command
*/
function show_log() {
  var log_string = "";
  for(i = 0; i < commits.length; i += 3) {
    log_string += ("<p class='text-yellow'>commit "+commits[i+1]+"</p>Author:&nbsp;You &lt;your@email.com&gt;<br />Date:&nbsp;&nbsp;&nbsp;&nbsp;"+commits[i+2]+"<br /><p style='padding-left:30px'>"+commits[i]+"</p>");
  }
  return log_string;
} // end show_log()


/**
  * Create a file in your current folder
  * Params: parameter1 is filename and contain the file name; parameter2 is filecontent and contains the content of the folder
*/
function add_file(filename, filecontent) {
  currentFolder[filename] = filecontent;
} // end add_file()


/**
  * Create a new commit entry
  * Params: parameter1 is the message of the commit; parameter2 is the commit key
*/
function add_commit(msg, key) {
  commits.push(msg);
  commits.push(key);
  commits.push(new Date());
} // end add_commit()



/* NOT USED */
function add_commit_code(key) {
  commit_codes.push(key);
} // end add_commit_code()



/**
  * Move the count of the step and redirect to the next page of the tutorial
*/
function nextStep() {
  step++;
  document.location.href = document.location.href.substring(0, document.location.href.length-2) + ("0" + step).slice(-2);
} // end nextStep()


/* END GIT EVENTS */


// Scrollbar of the terminal
$('.panel').stop().animate({
  scrollTop: $(".panel")[0].scrollHeight
}, 200);