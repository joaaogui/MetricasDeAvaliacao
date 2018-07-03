
# coding: utf-8

# In[1]:


from github import Github
from datetime import datetime, timedelta
import plotly.plotly as py
import plotly
from plotly.graph_objs import *
from collections import Counter


# In[2]:


# Create a Github instance:
g = Github("9324fedffc85017817ff2533e9237fc81fc611a9")

# Find my user
user = g.get_user()

# Find the organization I want
org = g.get_organization("fga-gpp-mds")

# Get all repos from my account, including from organizations
repos = org.get_repos()

# Get the repo, either from user or organization, uncomment the repo you want. (Only one repo can be uncommented)

# repo = org.get_repo("Falko-2017.2-BackEnd")
# repo = org.get_repo("2017.2-Receituario-Medico")
# repo = org.get_repo("2017.2-QueroCultura")
# repo = org.get_repo("2016.2-MissaoNascente")
# repo = org.get_repo("2017.2-Classificacao-de-Risco-Pediatrico")
# repo = org.get_repo("2017.1-PlataformaJogosUnB")
# repo = org.get_repo("2016.1-AbasteceAqui")
# repo = user.get_repo("timer")


# In[ ]:


for repo in repos:
    date = repo.name[:6]
    if repo.name[:3] == "201":
        collaborators = repo.get_stats_contributors()
        print(repo.name)
        print(collaborators)
#         for collaborator in collaborators:
#             print(collaborators)

