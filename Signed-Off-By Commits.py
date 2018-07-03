
# coding: utf-8

# In[25]:


from github import Github
import plotly
import plotly.plotly as py
from plotly.graph_objs import *
from collections import *
from pprint import pprint
from datetime import datetime, timedelta
# import matplotlib.pyplot as plt
# from IPython.display import Image


# In[41]:


# Create a Github instance:
g = Github("9324fedffc85017817ff2533e9237fc81fc611a9")

# Find my user
user = g.get_user()

# Find the organization I want
org = g.get_organization("fga-gpp-mds")

# Get all repos from my account, including from organizations
repos = user.get_repos()

# Get the repo, either from user or organization, uncomment the repo you want. (Only one repo can be uncommented)

# repo = org.get_repo("Falko-2017.2-BackEnd")
# repo = org.get_repo("2017.1-OndeE-UnB")
# repo = org.get_repo("2017.2-Receituario-Medico")
# repo = org.get_repo("2017.2-Deputinder")
# repo = org.get_repo("2017.2-QueroCultura")
# repo = org.get_repo("2016.2-MissaoNascente")
# repo = org.get_repo("2017.2-Classificacao-de-Risco-Pediatrico")
# repo = org.get_repo("2017.1-PlataformaJogosUnB")
# repo = org.get_repo("2016.1-AbasteceAqui")
# repo = org.get_repo("2017.1-Trezentos")
# repo = user.get_repo("timer")
# repo = user.get_repo("pesquini")


# In[50]:


# f = open('repos.txt',"r")
with open('repos.txt') as f:
    lines = f.readlines()
    for line in lines:
        print(repr(line))
        line = line[:-1] 
        repo = org.get_repo(line)
        name = repo.name.replace('2018.1-','') 
        print(name)
        # In[56]:


        #
        # 2018.1
        #
        # repo = org.get_repo("2018.1_Gerencia_mais")
        # repo = org.get_repo("2018.1-Dr-Down")
        # repo = org.get_repo("2018.1-Dulce_App")
        # repo = org.get_repo("2018.1-TropicalHazards-BI")
        # repo = org.get_repo("2018.1-TropicalHazards-BI-FrontEnd")
        # repo = org.get_repo("2018.1_Nexte")
        # repo = org.get_repo("2018.1-Reabilitacao-Motora")
        # repo = org.get_repo("2018.1-VoxPop-WebApp")
        # repo = org.get_repo("2018.1-IncluCare_API")
        # repo = org.get_repo("2018.1-IncluCare")
        # repo = org.get_repo("2018.1-Lacos-da-Alegria")
        # repo = org.get_repo("2018.1-VoxPop-API")
        # repo = org.get_repo("2018.1-Cardinals")
        # repo = org.get_repo("2018.1-Dulce_API")
        # repo = org.get_repo("2018.1-Lacos-da-Alegria-API")



        # In[57]:


        all_commit_count = defaultdict(list)
        signed_commit_count = Counter()


        # In[58]:


        for commit in repo.get_commits():
            real_date = commit.commit.author.date - timedelta(hours=2)
            all_commit_count[real_date.date()].append(commit.commit)
        #     for saved_commit in all_commit_count[real_date.date()]:
        #         if "Merge" in saved_commit.message or "Merging" in saved_commit.message:
        #             all_commit_count[real_date.date()].remove(saved_commit)
            if (commit.commit.message.count("Co-authored-by:") > 1 or (commit.commit.message.count("Co-authored-by:") == 1)) or (commit.commit.message.count("Signed-off-by:") > 1 or (commit.commit.message.count("Signed-off-by:") == 1 and
                    commit.commit.author.email not in commit.commit.message) or ((commit.commit.author.email != commit.commit.committer.email) 
                                                and ("noreply@github.com" not in commit.commit.committer.email))):

                signed_commit_count[real_date.date()] += 1
            else:
                signed_commit_count[real_date.date()] += 0


        # In[59]:


        commit_count = {k: len(v) for k, v in all_commit_count.items()}

        dates = list(commit_count.keys())
        dates.sort()

        commit_count = sorted(commit_count.items())
        all_amount_by_date = [x[1] for x in commit_count]
        signed_commit_count = sorted(signed_commit_count.items())
        signed_amount_by_date = [x[1] for x in signed_commit_count]

        label = repo.name
        label
        print(label)


        # In[60]:


        # Setting up plotly
        plotly.tools.set_credentials_file(username='joaaogui', api_key='2TfVhKWEO6rpuxlj7c6R')
        # Setting the privacy of the chart
        plotly.tools.set_config_file(world_readable=True, sharing='public')

        # Setting up the data for the chart
        trace0 = Scatter(
            x=dates,
            y=all_amount_by_date,
            name='All Commits'
        )
        trace1 = Scatter(
            x=dates,
            y=signed_amount_by_date,
            name="Signed-Off-By Commits"
        )
        data = Data([trace0, trace1])
        title1 = "Pair programming evolution during project - " + label[7:]
        # Setting the layout for the chart
        layout = Layout(title=title1,
                        xaxis=dict(title='Date of commit'),
                        yaxis=dict(title='Amount of commits'))

        chart = Figure(data=data, layout=layout)
        py.image.save_as(chart, filename=name + '.png') 
        # Image(name + '.png')

        plotly.offline.plot(chart, filename = 'Signed-off-by whitout merges', auto_open=True,
                            image_width=1280, image_height=800,
                            image_filename=name + '.png', image='svg')

        # py.iplot(chart, filename = 'Signed-off-by whitout merges')

