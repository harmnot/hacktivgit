# hacktivgit

"/user" => GET => get owner by own token <br> <br>
"/search/:userName" => GET => search users <br> <br>
"/starred/:user" => GET => find starred repo <br> <br>
"/addrepo" => POST => create repos <br> <br>
"/deleterepo/:owner/:repoName" => DELETE => delete repo but must has own token <br> <br>
"/unstar/:owner/:repoName" => DELETE => unstar the starred repo of us <br> <br>
