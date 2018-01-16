from github import Github
import plotly
import plotly.plotly as py
from plotly.graph_objs import *
from collections import *
from pprint import pprint
from datetime import datetime, timedelta
import matplotlib.pyplot as plt


# Create a Github instance:
g = Github("9324fedffc85017817ff2533e9237fc81fc611a9")

# Find my user
user = g.get_user()

# Find the organization I want
org = g.get_organization("fga-gpp-mds")

# Get all repos from my account, including from organizations
repos = user.get_repos()

# Get the repo, either from user or organization
repo = org.get_repo("Falko-2017.2-BackEnd")
# repo = org.get_repo("2017.2-Receituario-Medico")
# repo = org.get_repo("2017.2-QueroCultura")
# repo = org.get_repo("2016.2-MissaoNascente")
# repo = org.get_repo("2017.2-Classificacao-de-Risco-Pediatrico")
# repo = org.get_repo("2017.1-PlataformaJogosUnB")
# repo = org.get_repo("2016.1-AbasteceAqui")
# repo = user.get_repo("timer")

all_commit_count = defaultdict(list)
signed_commit_count = Counter()
signoff_without_author = 0
correct_signoff = 0
signoff_total = 0
signoff_same_author = 0
real_signoff = 0
empty_list = []

for commit in repo.get_commits():
    real_date = commit.commit.author.date - timedelta(hours=2)
    all_commit_count[real_date.date()].append(commit.commit)
    for saved_commit in all_commit_count[real_date.date()]:
        if "Merge" in saved_commit.message or "Merging" in saved_commit.message:
            all_commit_count[real_date.date()].remove(saved_commit)
    if commit.commit.message.count("Signed-off-by:") > 1 or (commit.commit.message.count("Signed-off-by:") == 1 and
            commit.commit.author.email not in commit.commit.message) or ((commit.commit.author.email != commit.commit.committer.email) and ("noreply@github.com" not in commit.commit.committer.email)):
            # or (commit.commit.authoremail.email != commit.commit.committer.email)
        # print(real_date.date())
        # print(commit.commit.message)
        # print("******")
        # signed_commit_count[real_date.date()].append(commit.commit.message)
        signed_commit_count[real_date.date()] += 1
        # pprint(signed_commit_count)
        # pprint(signed_commit_count[real_date.date()])
    else:
    #     signed_commit_count[real_date.date()].append(empty_list)
        signed_commit_count[real_date.date()] += 0
        # signed_commit_count[real_date.date()].append(commit.commit)
    # if "Signed-off-by:" in commit.commit.message:
    #      signed_commit_count[real_date.23date()] += 1
    # else:
    #      signed_commit_count[real_date.date()] = 0
# pprint(signed_commit_count)
        # real_signoff +=1
    #
    # if "Signed-off-by:" in commit.commit.message:
    #     signoff_total+=1
    # if "Signed-off-by:" in commit.commit.message and commit.commit.author.email not in commit.commit.message:
    #     signoff_without_author += 1
    # elif "Signed-off-by:" in commit.commit.message:
    #     correct_signoff += 1
    # if commit.commit.message.count("Signed-off-by:") == 1 and commit.commit.author.email in commit.commit.message:
    #     signoff_same_author += 1

# pprint(all_commit_count)
# print("Sign off sem o autor do commit: %d" %(signoff_without_author))
# print("Sign off que só contém o autor (Não entra na conta): %d" %(signoff_same_author))
# print("Sign off correto : %d" %(correct_signoff))
# print("Total de Sign off : %d" %(signoff_total))
# print("Sign off reais: %d" %(signoff_total - signoff_same_author))
# print("Sign off reais: %d" %(real_signoff))
    # print(commit.commit.message.count("Signed-off-by:"))
    # if commit.commit.message.count("Signed-off-by:") > 1 :
    #     signed_commit_count[commit.commit.author.date.date()] += 1
    # else:
    #     signed_commit_count[commit.commit.author.date.date()] = 0



commit_count = {k: len(v) for k, v in all_commit_count.items()}
# signed_commit_count = {k: len(v) for k, v in signed_commit_count.items()}

# pprint(signed_commit_count, stream=None, indent=1, width=80, depth=None)



dates = list(commit_count.keys())
dates.sort()

commit_count = sorted(commit_count.items())
all_amount_by_date = [x[1] for x in commit_count]
signed_commit_count = sorted(signed_commit_count.items())
signed_amount_by_date = [x[1] for x in signed_commit_count]

# pprint(signed_commit_count, stream=None, indent=1, width=80, depth=None)
# pprint(signed_amount_by_date, stream=None, indent=1, width=80, depth=None)

# Setting up plotly
plotly.tools.set_credentials_file(username='joaaogui', api_key='2TfVhKWEO6rpuxlj7c6R')
# Setting the privacy of the chart
plotly.tools.set_config_file(world_readable=True, sharing='public')

trace0 = Scatter(
    x=dates,
    y=all_amount_by_date
)
trace1 = Scatter(
    x=dates,
    y=signed_amount_by_date
)
data = Data([trace0, trace1])

py.iplot(data, filename = 'signed-off-by whitout merges')
